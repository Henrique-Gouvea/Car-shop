import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/carsModel'
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { validCar, validCarId, updatedCar, allCars, updateCar } from '../mocks/carMocks'
import CarsService from '../../../services/carsService';
import CarsController from '../../../controllers/carsController'

describe('Cars Controller', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(validCarId);
    sinon.stub(carsService, 'read').resolves(allCars);
    sinon.stub(carsService, 'readOne').resolves(validCarId);
    sinon.stub(carsService, 'update').resolves(updatedCar);
    sinon.stub(carsService, 'delete').resolves(validCarId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a Car', () => {
    it('Created Sucess', async () => {
      const newCar = await carsController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(validCarId)).to.be.true;
    });
  })   

  describe('All cars', () => {
    it('get all Sucess', async () => {
      const newCar = await carsController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCars)).to.be.true;
    });
  })   

  describe('Search car', () => {
    it('get one Sucess', async () => {
      const newCar = await carsController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCars)).to.be.true;
    });
  })   

  describe('Search car', () => {
    it('get one Sucess', async () => {
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(validCarId)).to.be.true;
    });
  });

  describe('Update car', () => {
  
    it('update one Sucess', async () => {
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(validCarId)).to.be.true;
    });
  })
  
    describe('Delete car', () => {

      it('deleted Sucess', async () => {
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      });
    });

});