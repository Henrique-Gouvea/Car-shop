import { Router, Request, Response } from 'express';
import carController from '../controllers/carsController';
import carModel from '../models/carsModel';
import carService from '../services/carsService';

const routeCar = Router();

const cars = new carModel();
const carsService = new carService(cars);
const carsController = new carController(carsService);

routeCar.post('/', (req: Request, res: Response) =>
  carsController.create(req, res));

export default routeCar;