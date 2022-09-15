import { Router, Request, Response } from 'express';
import CarsController from '../controllers/carsController';
import CarModel from '../models/carsModel';
import CarsService from '../services/carsService';

const routeCar = Router();

const cars = new CarModel();
const carService = new CarsService(cars);
const carsController = new CarsController(carService);

routeCar.post('/cars', (req: Request, res: Response) =>
  carsController.create(req, res));

routeCar.get('/cars', (req: Request, res: Response) =>
  carsController.read(req, res));

routeCar.get('/cars/:id', (req: Request, res: Response) =>
  carsController.readOne(req, res));

export default routeCar;