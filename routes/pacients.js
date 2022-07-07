import express from 'express';
import auth from '../middleware/auth.js';
import { createPacient, consultPacient } from '../controllers/pacient.js';

const router = express.Router();

router.post('/createPacient', auth, createPacient);
router.post('/consultPacient/:id', consultPacient);

export default router;