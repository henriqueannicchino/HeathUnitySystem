import express from 'express';
import auth from '../middleware/auth.js';
import { createPacient, consultPacient } from '../controllers/pacient.js';

const router = express.Router();

router.post('/createPacient', createPacient);
router.post('/consultPacient/:id', consultPacient);

export default router;