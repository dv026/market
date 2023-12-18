import axios from 'axios';
import { CarModel } from '../model';
import { PurchaseStatuses } from '../../../app/types';
import { PartialDeep } from 'type-fest';

const apiUrl = import.meta.env.VITE_API_URL;

type Data = Record<
  string,
  | string
  | number
  | boolean
  | Record<string, string | number | boolean>
  | string[]
  | Record<string, string | number | boolean>[]
>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a: Data = {
  extra: [{ name: 'd' }, { address: '123' }]
};

export const purchaseApi = {
  create: (purchase: PartialDeep<CarModel>) =>
    axios.post(`${apiUrl}/purchase`, purchase).then((response) => response.data),
  edit: (purchase: PartialDeep<CarModel>) =>
    axios.put(`${apiUrl}/purchase/${purchase._id}`, purchase).then((response) => response.data),
  getList: () => axios.get(`${apiUrl}/purchase/list`).then((response) => response.data),
  get: (purchaseId: string) =>
    axios.get(`${apiUrl}/purchase/${purchaseId}`).then((response) => response.data),
  remove: (purchaseId: string) =>
    axios.delete(`${apiUrl}/purchase/${purchaseId}`).then((response) => response.data),
  editStatus: (purchaseId: string, status: PurchaseStatuses) =>
    axios
      .patch(`${apiUrl}/purchase/${purchaseId}/status`, { status })
      .then((response) => response.data),
  // depricated
  editDeposit: (purchaseId: string, deposit: number) =>
    axios
      .patch(`${apiUrl}/purchase/deposit/${purchaseId}`, { deposit })
      .then((response) => response.data),
  editSoldPrice: (purchaseId: string, soldPrice: number) =>
    axios
      .patch(`${apiUrl}/purchase/${purchaseId}/sold-price`, { soldPrice })
      .then((response) => response.data),
  partialEdit: (purchaseId: string, data: Data) =>
    axios.patch(`${apiUrl}/purchase/${purchaseId}`, data).then((response) => response.data),
  getStats: () => axios.get(`${apiUrl}/stats`).then((response) => response.data),
  depositBack: (id: string) =>
    axios.get(`${apiUrl}/purchase/${id}/deposit/back`).then((response) => response.data),
  fakeFeeBack: (id: string) =>
    axios.get(`${apiUrl}/purchase/${id}/fake-fee/back`).then((response) => response.data),
  commissionBack: (id: string) =>
    axios.get(`${apiUrl}/purchase/${id}/commission/back`).then((response) => response.data)
};
