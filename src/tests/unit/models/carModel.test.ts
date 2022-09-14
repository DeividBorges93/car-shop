import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId
} from '../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', async () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    })
  });

});