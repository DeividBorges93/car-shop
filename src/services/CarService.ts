import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import carZodSchema from '../Schemas/carZodSchema';

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
}