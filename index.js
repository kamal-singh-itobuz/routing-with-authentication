import express from 'express';
import dotenv from 'dotenv';
const dotenvConfig = dotenv.config();

import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDb from './config/dbConnection.js';

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //this is a in-built middleware to parse the data stream to json
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));