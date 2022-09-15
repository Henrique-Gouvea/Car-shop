import { IModel } from '../interfaces/IModel';
import { ICar } from '../interfaces/ICar';
import schemaCar from '../schemas/schemaCar';
import { IService } from '../interfaces/IService';

class CarsService implements IService<ICar> {
  private _cars: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = schemaCar.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._cars.create(obj);
  }

  public async read():Promise<ICar[] | null> {
    return this._cars.read();
  }

  public async readOne(_id:string):Promise<ICar | null> {
    return null;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    return null;
  }

  public async delete(_id:string): Promise<ICar | null> {
    return null;
  }
}
export default CarsService;
