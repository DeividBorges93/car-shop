import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ZodError } from 'zod';
import CreateCarModel from '../../../creaters/createCarModel';
import {
  carMock,
  carArrayMock,
  carMockWithId,
  
} from '../mocks/carMocks';
import { Model } from 'mongoose';

chai.use(chaiAsPromised);

describe('Car Model', () => {
  const carModel = CreateCarModel.instantiate();
  const _id = '4edd40c86762e0fb12000003';

  afterEach(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Finding all cars', () => {
    it('successfully found', async () => {
      sinon.stub(Model, 'find').resolves(carArrayMock);
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carArrayMock);
    });
  });

  describe('Finding a car', () => {
    it('successfully found', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
      const car = await carModel.readOne(_id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
});