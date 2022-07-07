import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import pacientRoutes from './routes/pacients.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "10mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/pacient', pacientRoutes);

const PORT = process.env.PORT || 5000;

console.log("Trying to connect with database");
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.log(error.message));
	