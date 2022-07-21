import express from 'express';
import auth from '../middleware/auth.js';
import { createSchedule, getAllSchedulesDay, updateSchedule, getReportSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.post('/getAllSchedulesDay/:id', auth, getAllSchedulesDay);
router.post('/createSchedule', auth, createSchedule);
router.patch('/updateSchedule/:id', auth, updateSchedule);
router.post('/getReportSchedule', getReportSchedule);

export default router;