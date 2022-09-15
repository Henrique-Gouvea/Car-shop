import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const cars = { model, year, color, status, buyValue, doorsQty, seatsQty };
    const results = await this._service.create(cars);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<ICar[] | null>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const result = await this._service.read(req.params.id);
    return res.status(200).json(result);
  }
}
