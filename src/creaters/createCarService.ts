import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

export default class CreateCarController {
  static instantiate() {
    const model = new CarModel();
    return new CarService(model);
  }
}