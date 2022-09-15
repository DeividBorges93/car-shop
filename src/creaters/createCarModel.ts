import CarModel from '../models/CarModel';

export default class CreateCarModel {
  static instantiate() {
    return new CarModel();
  }
}