import express from 'express';
import auth from '../middleware/auth.js';
import { signin, createUser, createUserByAdm, getAllUsers, consultUser, updateUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/createUserByAdm', auth, createUserByAdm);
router.post('/createUser', createUser);
router.get('/getAllUsers', auth, getAllUsers);
router.patch('/updateUser/:id', auth, updateUser);
router.post('/consultUser/:id', consultUser);

export default router;