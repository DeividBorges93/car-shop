import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRoutes from './routes/cars.routes';

const app = express();
app.use(express.json());
app.use(carRoutes);

app.use(errorHandler);

export default app;
