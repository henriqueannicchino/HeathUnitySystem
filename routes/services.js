import express from 'express';
import auth from '../middleware/auth.js';
import { createDoc } from '../services/createdoc.js';

const router = express.Router();

router.post('/createdoc', createDoc)
 
export default router;