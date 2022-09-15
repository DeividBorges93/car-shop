import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CreateCarModel from '../../../creaters/createCarModel';
import {
  carArrayMock,
  carMock,
  carMockWithId
} from '../mocks/carMocks';
import CarService from '../../../services/CarService';

chai.use(chaiAsPromised);

describe('Car Service', () => {
  const carModel = CreateCarModel.instantiate();
  const carService = new CarService(carModel);


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
})
