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
            const schedules = await Schedule.find({scheduleDate: {$gte: currentDate, $lte: currentDate}, userId: id}).select('_id scheduleDate time present createdAt')
            .populate({path:"userId", select:['name']})
            .populate({path:"pacientId", select:['name']});

            res.status(200).json(schedules);
        }
        else {
            const schedules = await Schedule.find({scheduleDate: {$gte: currentDate, $lte: currentDate}}).select('_id scheduleDate time present createdAt')
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

export const getReportSchedule = async(req, res) => {

    const {year} = req.body;

    try{
        
        let schedulesTotal = 0, schedulesDentist = 0, schedulesDoctor = 0, schedulesNurse = 0;
        let schedulePhysiotherapist = 0, schedulePsychologist = 0;

        const schedules = await Schedule.find({scheduleDate: {$gte: `${year}-01-01`, $lte: `${year}-12-31`}, present: true}).select('_id scheduleDate time present createdAt')
            .populate({path:"userId", select:['type']});

        schedulesTotal = schedules.length;
        await schedules.map(schedule => {
            if(schedule.userId.type==="Dentista")
                schedulesDentist++;
            else if(schedule.userId.type==="Enfermeiro(a)")
                schedulesNurse++;
            else if(schedule.userId.type==="Fisioterapeuta")
                schedulePhysiotherapist++;
            else if(schedule.userId.type==="Médico(a)")
                schedulesDoctor++;
            else if(schedule.userId.type==="Psicólogo(a)")
                schedulePsychologist++;
        });

        res.status(200).json({
            Total: schedulesTotal, 
            Dentist: schedulesDentist,
            Nurse: schedulesNurse,
            Physiotherapist: schedulePhysiotherapist,
            Doctor: schedulesDoctor,
            Psychologist: schedulePsychologist
        });       
        

    } catch (error) {
        res.status(500).json({ message: 'Algo deu errado.' });
    }
}