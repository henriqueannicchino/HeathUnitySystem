import Schedule from '../models/Schedule.js';
import User from '../models/user.js';

export const createSchedule = async(req, res) => {
    const newSchedule = req.body;

    try{

        await Schedule.create(newSchedule);

        res.status(200).json({ message: "Agendamento criado"});
    } catch (error){

        res.status(500).json({ message: 'Algo deu errado.' });
    }
}

export const getAllSchedulesDay = async(req, res) => {
    const { id } = req.params;
    const {currentDate} = req.body;

    try{
        const user = await User.findById(id).select('type');

        if(user.type!=="adm"){
            const schedules = await Schedule.find({scheduleDate: currentDate, userId: id}).select('_id scheduleDate time present createdAt')
            .populate({path:"userId", select:['name']})
            .populate({path:"pacientId", select:['name']});

            res.status(200).json(schedules);
        }
        else {
            const schedules = await Schedule.find({scheduleDate: currentDate}).select('_id scheduleDate time present createdAt')
            .populate({path:"userId", select:['name']})
            .populate({path:"pacientId", select:['name']});

            res.status(200).json(schedules);
        }

    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}


export const updateSchedule = async(req, res) => {
    const { id } = req.params;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    
    try{

        await Schedule.updateOne({_id: id }, {$set: updateOps});
        
        res.status(200).json({ message: 'Agendamento atualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}