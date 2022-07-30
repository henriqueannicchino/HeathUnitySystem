import express from 'express';
import auth from '../middleware/auth.js';
import { createSchedule, getAllPacientSchedules, getAllSchedulesDay, updateSchedule, getReportSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.post('/getAllPacientSchedules/:id',  getAllPacientSchedules);
router.post('/getAllSchedulesDay/:id', auth, getAllSchedulesDay);
router.post('/createSchedule', auth, createSchedule);
router.patch('/updateSchedule/:id', auth, updateSchedule);
router.post('/getReportSchedule', auth, getReportSchedule);

export default router;