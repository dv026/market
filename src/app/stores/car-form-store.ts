import { Nullable, PurchaseStatuses, PurchaseTypes } from './../types';
import { create } from 'zustand';
import { CarModel } from '../../entities/car-brand/model/car-model';
import { CarBrandModel } from '../../entities/car-brand/model/car-brand';

interface CarFormStore {
  carBrand: Nullable<CarBrandModel>;
  carModel: Nullable<CarModel>;
  year: Nullable<number>;
  mileage: Nullable<number>;
  price: Nullable<number>;
  status: PurchaseStatuses;
  purchaseType: PurchaseTypes;
  commissionRate: Nullable<number>;
  depositRate: Nullable<number>;
  setCarBrand: (carBrand: Nullable<CarBrandModel>) => void;
  setCarModel: (carModel: Nullable<CarModel>) => void;
  setYear: (year: Nullable<number>) => void;
  setMileage: (mileage: Nullable<number>) => void;
  setPrice: (price: Nullable<number>) => void;
  setStatus: (status: PurchaseStatuses) => void;
  setPurchaseType: (purchaseType: PurchaseTypes) => void;
  setDefaultValues: () => void;
  setPurchase: (purchase: CarFormStore) => void;
  setCommissionRate: (commissionRate: Nullable<number>) => void;
  setDepositRate: (depositRate: Nullable<number>) => void;
}
export const useCarFormStore = create<CarFormStore>((set) => ({
  carBrand: null,
  carModel: null,
  year: null,
  mileage: null,
  price: null,
  status: PurchaseStatuses.Future,
  purchaseType: PurchaseTypes.Auction,
  commissionRate: 15,
  depositRate: 30,
  setCarBrand: (carBrand) => set(() => ({ carBrand })),
  setStatus: (status) => set(() => ({ status })),
  setCarModel: (carModel) => set(() => ({ carModel })),
  setYear: (year) => set(() => ({ year })),
  setMileage: (mileage) => set(() => ({ mileage })),
  setPrice: (price) => set(() => ({ price })),
  setPurchaseType: (purchaseType) => set(() => ({ purchaseType })),
  setDefaultValues: () =>
    set(() => ({ price: null, carBrand: null, carModel: null, year: null, mileage: null })),
  setPurchase: (purchase: CarFormStore) => set(() => ({ ...purchase })),
  setCommissionRate: (commissionRate: Nullable<number>) => set(() => ({ commissionRate })),
  setDepositRate: (depositRate: Nullable<number>) => set(() => ({ depositRate }))
}));
