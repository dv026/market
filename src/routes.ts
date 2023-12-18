import { Nullable } from './app/types';
export const routes = {
  root: '/',
  purchase: {
    edit: (id: Nullable<string>) => `/purchase/${id}/edit`,
    create: '/purchase/create'
  }
};
