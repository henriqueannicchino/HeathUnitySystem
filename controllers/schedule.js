import Schedule from '../models/Schedule.js';

export const createSchedule = async(req, res) => {
    const newSchedule = req.body;

    try{

        await Schedule.create(newSchedule);

        res.status(200).json({ message: "Agendamento criado"});
    } catch (error){

        res.status(500).json({ message: 'Algo deu errado.' });
    }
}


