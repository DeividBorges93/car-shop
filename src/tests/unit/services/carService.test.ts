import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CreateCarModel from '../../../creaters/createCarModel';
import {
  carArrayMock,
  carMock,
  carMockFailure,
  carMockWithId
} from '../mocks/carMocks';
import CarService from '../../../services/CarService';
import { ErrorTypes } from '../../../errors/catalog'

chai.use(chaiAsPromised);

describe('Car Service', () => {
  const carModel = CreateCarModel.instantiate();
  const carService = new CarService(carModel);
  const _id = '4edd40c86762e0fb12000003';
  const invalidId = 'INVALID_ID';
  const nonExistentId = '4edd40c86762e0fb12001233';

  afterEach(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('creation failure', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
      return expect(carService.create({} as any)).to.eventually.be.rejectedWith(ZodError);
    })
  });

  describe('Finding all cars', () => {
    it('successfully found', async () => {
      sinon.stub(carModel, 'read').resolves(carArrayMock);
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(carArrayMock);
    });
  });

  describe('Finding a car', () => {
    it('successfully found', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);
      const car = await carService.readOne(_id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  
    it('invalid ID', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);
      return expect(carService.readOne(invalidId)).to.eventually.be.rejectedWith(Error, ErrorTypes.InvalidMongoId);
    });
  
    it('if car does not exist', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockFailure);
        return expect(carService.readOne(nonExistentId)).to.eventually.be.rejectedWith(Error, ErrorTypes.EntityNotFound);
    });
  });
})
