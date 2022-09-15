import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class FrameController {
  constructor(private _service: IModel<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const cars = { model, year, color, status, buyValue, doorsQty, seatsQty };
    const results = await this._service.create(cars);
    return res.status(201).json(results);
  }
}
