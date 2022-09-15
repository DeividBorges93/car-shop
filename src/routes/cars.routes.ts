import { Router } from 'express';
import CreateCarController from '../creaters/createCarController';

const route = Router();

const carController = CreateCarController.instantiate();

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));

export default route;