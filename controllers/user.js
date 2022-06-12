import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req, res) => {
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist. "});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.KEY, {expiresIn: "2h"});

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const createUser = async(req, res) => {
    const { name, userName, password, type } = req.body;

    try{
        
        const existingUser = await User.findOne({ userName });

        if(existingUser) return res.status(400).json({ message: "User already exist. "});

        const hashedPassword = await bcrypt.hash(password, 11);

        const result = await User.create({ name, userName, password: hashedPassword, type});

        res.status(200).json({ message: "user created", result});
    } catch (error){
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const consultUser = async(req, res) => {
    const { id } = req.params;

    try{
        const user = await User.findById(id).select('');
        console.log(user);
        res.status(200).json({ typeUser: user.typeUser, whatsApp: user.whatsApp});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}
