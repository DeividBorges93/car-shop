import CarModel from '../models/CarModel';

export default class CreateCarController {
  static instantiate() {
    return new CarModel();
  }
}