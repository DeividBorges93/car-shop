import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

export default class CreateCarService {
  static instantiate() {
    const model = new CarModel();
    return new CarService(model);
  }
}