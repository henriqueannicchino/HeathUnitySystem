import express from 'express';
import auth from '../middleware/auth.js';
import { createPacient, getAllPacientsName, consultPacient, updatePacient } from '../controllers/pacient.js';

const router = express.Router();

router.post('/createPacient', auth, createPacient);
router.get('/getAllPacientsName', auth, getAllPacientsName);
router.get('/consultPacient/:id', auth, consultPacient);
router.patch('/updatePacient/:id', auth, updatePacient);

export default router;