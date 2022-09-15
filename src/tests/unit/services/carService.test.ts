import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CreateCarService from '../../../creaters/createCarService';
import CreateCarModel from '../../../creaters/createCarModel';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId
} from '../mocks/carMocks';

describe('Car Service', () => {
  const carService = CreateCarService.instantiate();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('creation failure', async () => {
      try {
        await carService.create({} as any)
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
})
