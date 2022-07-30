import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req, res) => {
    const { userName, password } = req.body;

    try{
        const existingUser = await User.findOne({ userName });

        if(!existingUser){ 
            return res.status(404).json({ message: "Usuário não existe. "});
        } else if(existingUser.status!=="approved") {
            if(existingUser.type!=="adm"){
                return res.status(511).json({ message: "Usuário não possui permissão para logar "});
            }
        };

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({ message: "Credenciais invalidas." });

        const token = jwt.sign({ name: existingUser.name, userName: existingUser.userName, type: existingUser.type, id: existingUser._id }, process.env.KEY, {expiresIn: "2h"});

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    } 
}

export const createUser = async(req, res) => {
    const { name, userName, password, type } = req.body;

    try{
        
        const existingUser = await User.findOne({ userName });

        if(existingUser) return res.status(400).json({ message: "Usuário já existe. "});

        const hashedPassword = await bcrypt.hash(password, 11);

        await User.create({ name, userName, password: hashedPassword, type});

        res.status(200).json({ message: "usuário criado"});
    } catch (error){
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const createUserByAdm = async(req, res) => {
    const { name, userName, password, type, status } = req.body;
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    try{
        
        if(decodedData.type === "adm"){
            const existingUser = await User.findOne({ userName });

            if(existingUser) return res.status(400).json({ message: "Usuário já existe. "});

            const hashedPassword = await bcrypt.hash(password, 11);

            await User.create({ name, userName, password: hashedPassword, type, status});

            res.status(200).json({ message: "usuário criado"});
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }

    } catch (error){
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const getAllUsers = async(req, res) => {
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    try{

        if(decodedData.type === "adm"){
            const users = await User.find().select('_id name userName type status profileImage createdAt');
            res.status(200).json(users);
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }

    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const consultUser = async(req, res) => {
    const { id } = req.params;
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    try{
        if(decodedData.type === "adm"){
            const user = await User.findById(id).select('');

            res.status(200).json({ 
                id: user._id, name: user.name, userName: user.userName, 
                type: user.type, status: user.status, profileImage: user.profileImage, 
                createdAt: user.createdAt 
            });
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const updateUser = async(req, res) => {
    const { id } = req.params;
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    const updateOps = {};

    for(const ops of req.body){
        if(ops.propName==="password") {
            updateOps[ops.propName] = await bcrypt.hash(ops.value, 11);
        }
        else {
            updateOps[ops.propName] = ops.value;
        }
    }
    
    try{

        if(decodedData.type === "adm"){
            await User.updateOne({_id: id }, {$set: updateOps});
        
            res.status(200).json({ message: 'Usuário atualizado' });
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }

    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}
