import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, status, buyValue, doorsQty, seatsQty };

    const results = await this._service.create(car);

    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();

    return res.status(200).json(cars);
  }
}