import { CarModel } from './car-model';

export interface CarBrandModel {
  country: string;
  id: string;
  models: CarModel[];
  popular: boolean;
  ['cyrillic-name']: string;
  name: string;
}
