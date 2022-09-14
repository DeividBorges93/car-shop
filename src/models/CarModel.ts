import { model as mongooseCreateModel } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import carMongooseSchema from '../Schemas/carMongooseSchema';
import MongoModel from './MongoModel';

export default class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}