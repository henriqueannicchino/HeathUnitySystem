import express from 'express';
import auth from '../middleware/auth.js';
import { signin, createUser, getAllUsers, consultUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/createUser', createUser);
router.get('/getAllUsers', auth, getAllUsers);
router.post('/consultUser/:id', consultUser);

export default router;