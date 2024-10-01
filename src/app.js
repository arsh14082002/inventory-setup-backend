import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import billRouter from './routes/createBill.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', billRouter);

export default app;
