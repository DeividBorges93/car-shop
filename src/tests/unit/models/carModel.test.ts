import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import CreateCarModel from '../../../creaters/createCarModel';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId
} from '../mocks/carMocks';

describe('Car Model', () => {
  const carModel = CreateCarModel.instantiate();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', async () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('creation failure', async () => {
      try {
        await carModel.create({} as any)
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

});