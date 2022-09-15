import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { Request, Response } from 'express';
import CreateCarService from '../../../creaters/createCarService';
import CreateCarController from '../../../creaters/createCarController';
import { Model } from 'mongoose';
import {
  carMock,
  carMockFailure,
  carMockWithId
} from '../mocks/carMocks';

describe('Car Controller', () => {
  const carService = CreateCarService.instantiate();
  const carController = CreateCarController.instantiate();
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('successfully created', async () => {
      req.body = carMock;
      await carController.create(req, res);
      
      const status = res.status as sinon.SinonStub;
      const json = res.json as sinon.SinonStub

      expect(status.calledWith(201)).to.be.true;
      expect(json.calledWith(carMockWithId)).to.be.true;
    });

    it('creation failure', async () => {
      try {
        req.body = carMockFailure;
        await carController.create(req, res);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

});