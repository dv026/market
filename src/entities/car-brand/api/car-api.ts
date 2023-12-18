import axios from 'axios';
import { CarModel } from '../model/car-model';
import { CarBrandModel } from '../model/car-brand';

const carUrl = 'https://cars-base.ru/api';

export const carBrandApi = {
  getModels: (carBrandId: string) =>
    axios
      .get<Promise<CarModel[]>>(`${carUrl}/cars/${carBrandId}`)
      .then((response) => response.data),
  getCarBrands: () =>
    axios.get<Promise<CarBrandModel[]>>(`${carUrl}/cars`).then((response) => response.data)
};
