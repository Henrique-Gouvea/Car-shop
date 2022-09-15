import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carsRouter from './routes/carsRoute';

const app = express();
app.use(carsRouter);
app.use(errorHandler);

export default app;
