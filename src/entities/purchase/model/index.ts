import { Nullable } from '../../../app/types';

export interface CarModel extends PurchaseModel {
  brand: Nullable<string>;
  model: Nullable<{ id: Nullable<string>; name: Nullable<string> }>;
  year: Nullable<number>;
  mileage: Nullable<number>;
}

export interface PurchaseModel {
  _id: string;
  price: Nullable<number>;
  type: string;
  purchaseType: string;
  status: string;
  soldPrice: Nullable<number>;
  deposit: FeeModel;
  fakeFee: FeeModel;
  commission: FeeModel;
  extraInfo: ExtraInfo[];
}

export interface FeeModel {
  rate: Nullable<number>;
  canReturn?: Nullable<boolean>;
  returned?: Nullable<boolean>;
}

export interface DepositModel {
  depositRate: Nullable<number>;
  fakeFeeRate: Nullable<number>;
  canReturnFakeFee: Nullable<boolean>;
  canReturnDeposit: Nullable<boolean>;
  fakeFeeReturned: Nullable<boolean>;
  depositReturned: Nullable<boolean>;
}

export interface ExtraInfo {
  name: string;
  value?: number;
  id?: number;
}
