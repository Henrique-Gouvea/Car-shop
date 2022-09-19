import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/carsModel'
import { Model } from 'mongoose';
import { validCar, validCarId, updatedCar, allCars, updateCar } from '../mocks/carMocks'

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(validCarId);
    sinon.stub(Model, 'find').resolves(allCars);
    sinon.stub(Model, 'findOne').resolves(validCarId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);
    sinon.stub(Model, 'findByIdAndDelete').resolves({});
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a Car', () => {
    it('Created Sucess', async () => {
      const newCar = await carsModel.create(validCar);
      expect(newCar).to.be.deep.equal(validCarId);
    });   
	});

  describe('All cars', () => {
    it('get all Sucess', async () => {
      const cars = await carsModel.read();
      expect(cars).to.be.deep.equal(allCars);
    });   
	});

  describe('Search car', () => {
    it('get one Sucess', async () => {
      const car = await carsModel.readOne('62fbfc88d58b3811e07e2aa4');
      expect(car).to.be.deep.equal(validCarId);
    });   
	});

  describe('Update car', () => {
    it('update one Sucess', async () => {
      const car = await carsModel.update(updatedCar.id, updateCar);
      expect(car).to.be.deep.equal(updatedCar);
    });   
	});

  describe('Delete car', () => {
    it('deleted Sucess', async () => {
      const car = await carsModel.delete(updatedCar.id);
      expect(car).to.be.deep.equal({});
    });   
	});


});