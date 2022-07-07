import Pacient from '../models/Pacient.js';


export const createPacient = async(req, res) => {
    const newPacient = req.body;

    try{

        const createdPacient = await Pacient.create(newPacient);

        res.status(200).json({ message: "Paciente criado",createdPacient: createdPacient});
    } catch (error){

        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

//62c43ffd7fa69862e7e1c869
export const consultPacient = async(req, res) => {
    const { id } = req.params;

    try{
        const pacient = await Pacient.findById(id).select('');
        
        res.status(200).json({ pacient });
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}
