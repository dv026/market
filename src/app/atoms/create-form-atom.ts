import { Nullable, PurchaseStatuses, PurchaseTypes } from './../types';
import { CarModel } from '../../entities/car-brand/model/car-model';
import { CarBrandModel } from '../../entities/car-brand/model/car-brand';
import { atom } from 'jotai';

interface CreateFormAtom {
  carBrand: Nullable<CarBrandModel>;
  carModel: Nullable<CarModel>;
  year: Nullable<number>;
  mileage: Nullable<number>;
  price: Nullable<number>;
  status: PurchaseStatuses;
  purchaseType: PurchaseTypes;
  commissionRate: Nullable<number>;
  depositRate: Nullable<number>;
  fakeFeeRate: Nullable<number>;
}

export const initialFormValues = {
  carBrand: null,
  carModel: null,
  year: null,
  mileage: null,
  price: null,
  status: PurchaseStatuses.Future,
  purchaseType: PurchaseTypes.Auction,
  commissionRate: 15,
  depositRate: 15,
  fakeFeeRate: 30
};

export const createFormAtom = atom<CreateFormAtom>(initialFormValues);
