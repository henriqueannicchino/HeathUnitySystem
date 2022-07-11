import Pacient from '../models/Pacient.js';


export const createPacient = async(req, res) => {
    const newPacient = req.body;

    try{
        
        await Pacient.create(newPacient);

        res.status(200).json({ message: "Paciente criado"});
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
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    try{

        await Pacient.updateOne({_id: id }, {$set: updateOps});
        
        res.status(200).json({ message: 'Paciente atualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}
