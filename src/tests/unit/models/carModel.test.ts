import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ZodError } from 'zod';
import CreateCarModel from '../../../creaters/createCarModel';
import {
  carMock,
  carMockWithId,
  
} from '../mocks/carMocks';
import { Model } from 'mongoose';

chai.use(chaiAsPromised);

describe('Car Model', () => {
  const carModel = CreateCarModel.instantiate();

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
});