import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import carZodSchema from '../Schemas/carZodSchema';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  constructor(private _car:IModel<ICar>) {}

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id:string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id:string, payload: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const parsed = carZodSchema.safeParse(payload);

    if (!parsed.success) throw parsed.error;
    
    const updatedCar = await this._car.update(_id, parsed.data);

    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);

    return updatedCar;
  }

  public async delete(_id:string) {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.delete(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }
}