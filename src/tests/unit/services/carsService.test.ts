import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/carsModel'
import { Model } from 'mongoose';
import { validCar, validCarId, updatedCar, allCars, updateCar } from '../mocks/carMocks'
import CarsService from '../../../services/carsService';

describe('Cars Service', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(validCarId);
    sinon.stub(carsModel, 'read').resolves(allCars);
    sinon.stub(carsModel, 'readOne').resolves(validCarId);
    sinon.stub(carsModel, 'update').resolves(updatedCar);
    sinon.stub(carsModel, 'delete').resolves(validCarId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a Car', () => {
    it('Created Sucess', async () => {
      const newCar = await carsService.create(validCar);
      expect(newCar).to.be.deep.equal(validCarId);
    });   

    it('Error creating(door < 2)', async () => {
      try {
        await carsService.create({ ...validCar, doorsQty: 1 });
      }	catch (err: any) {
        expect(err.issues[0].message).to.be.eq("Value should be greater than or equal to 2");
      }
    });   

    it('Error creating(seats > 7)', async () => {
      try {
        await carsService.create({ ...validCar, seatsQty: 8 });
      }	catch (err: any) {
        expect(err.issues[0].message).to.be.eq("Value should be less than or equal to 7");
      }
    });   
	});

  describe('All cars', () => {
    it('get all Sucess', async () => {
      const cars = await carsService.read();
      expect(cars).to.be.deep.equal(allCars);
    });   
	});

  describe('Search car', () => {
    it('get one Sucess', async () => {
      const car = await carsService.readOne('62fbfc88d58b3811e07e2aa4');
      expect(car).to.be.deep.equal(validCarId);
    });

  describe('Update car', () => {
  
    it('update one Sucess', async () => {
      const car = await carsService.update(updatedCar.id, updateCar);
      expect(car).to.be.deep.equal(updatedCar);
    });

    it('Error update(seats > 7)', async () => {
      try {
        await carsService.create({ ...validCar, seatsQty: 8 });
      }	catch (err: any) {
        expect(err.issues[0].message).to.be.eq("Value should be less than or equal to 7");
      }
    });  
  
    describe('Delete car', () => {

      it('deleted Sucess', async () => {
        const car = await carsService.delete(updatedCar.id);
        expect(car).to.be.deep.equal(null);
      });
    });
	});
});



});