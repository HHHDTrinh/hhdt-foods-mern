import express from 'express';
import cors from 'cors';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import foodsRoutes from './routes/foods.js';

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

const CONNECTION_URL = process.env.FOODS_MONGODB_URL;
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, () => {
    console.log('Connected to MongoDB');
});

app.use('/v1/foods', foodsRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`);
});
