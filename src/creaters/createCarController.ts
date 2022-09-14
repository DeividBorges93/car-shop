import CarModel from '../models/CarModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

export default class CreateCarController {
  static instantiate() {
    const model = new CarModel();
    const service = new CarService(model);
    
    return new CarController(service);
  }
}