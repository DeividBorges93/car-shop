import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import CreateCarService from '../../../creaters/createCarService';
import CarController from '../../../controllers/CarController';
import {
  carArrayMock,
  carMock,
  carMockFailure,
  carMockWithId
} from '../mocks/carMocks';

describe('Car Controller', () => {
  const carService = CreateCarService.instantiate();
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    
    it('successfully created', async () => {
      sinon.stub(carService, 'create').resolves(carMockWithId);
      req.body = carMock;
      await carController.create(req, res);
      
      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub

      expect(status.calledWith(201)).to.be.true;
      expect(json.calledWith(carMockWithId)).to.be.true;
    });
  });
  
  describe('Finding all cars', () => {
    it('successfully found', async () => {
      sinon.stub(carService, 'read').resolves(carArrayMock);
  
      await carController.read(req, res);
      
      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub
  
      expect(status.calledWith(200)).to.be.true;
      expect(json.calledWith(carArrayMock)).to.be.true;
    });
  });
});