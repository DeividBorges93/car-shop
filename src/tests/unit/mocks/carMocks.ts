import { ICar } from "../../../interfaces/ICar";

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockFailure: ICar = {
  model: "",
  year: 1963,
  color: "",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carArrayMock: ICar[] & { _id: string }[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  },
  {
    _id: "4edd40c94762e0fb12000003",
    model: "Porsche Cayman",
    year: 2015,
    color: "yellow",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  }
]

export { carMock, carMockWithId, carMockFailure, carArrayMock };