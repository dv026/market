import { create } from 'zustand';
import { CreateItemSteps, ItemTypes } from '../types';
import { persist } from 'zustand/middleware';

interface CreateItemStore {
  createItemStep: CreateItemSteps;
  setCreateItemStep: (setCreateItemStep: CreateItemSteps) => void;
  createItemType: ItemTypes;
  setCreateItemType: (itemType: ItemTypes) => void;
}
export const useCreateItemStore = create(
  persist<CreateItemStore>(
    (set) => ({
      createItemStep: CreateItemSteps.CHOOSE_TYPE,
      setCreateItemStep: (createItemStep) =>
        set(() => {
          return { createItemStep };
        }),
      createItemType: ItemTypes.CAR,
      // setCreateItemType: (createItemType) => set(() => ({ createItemType }))
      setCreateItemType: (createItemType) =>
        set(() => {
          return { createItemType };
        })
    }),
    {
      name: 'create-item-store'
    }
  )
);
