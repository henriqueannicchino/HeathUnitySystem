import Pacient from '../models/Pacient.js';
import jwt from 'jsonwebtoken';


export const createPacient = async(req, res) => {
    const newPacient = req.body;
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    try{
        
        if(decodedData.type === "adm"){
            await Pacient.create(newPacient);
            res.status(200).json({ message: "Paciente criado"});
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }

    } catch (error){

        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const getAllPacientsName = async(req, res) => {

    try{
        const pacients = await Pacient.find().select('_id name');
        res.status(200).json(pacients);
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const consultPacient = async(req, res) => {
    const { id } = req.params;

    try{
        const pacient = await Pacient.findById(id).select('');
        
        res.status(200).json({ pacient });
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const updatePacient = async(req, res) => {
    const { id } = req.params;

    const newPacient = req.body;
    let decodedData = req.headers.authorization.split(" ")[1];
    if(decodedData !== undefined){
        decodedData = jwt.decode(decodedData);
    }

    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    try{

        if(decodedData.type === "adm"){
            await Pacient.updateOne({_id: id }, {$set: updateOps});
            res.status(200).json({ message: 'Paciente atualizado' });
        }
        else {
            res.status(511).json({ message: 'Permissões insulficientes ou Sessão expirou'});
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}
