import express from 'express';
import auth from '../middleware/auth.js';
import { signin, createUser, consultUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/createUser', createUser);
router.post('/consultUser/:id', consultUser);

export default router;