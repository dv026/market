import { create } from 'zustand';
import { IUser } from '../models/user';
import { Nullable } from '../types';
import { persist } from 'zustand/middleware';

interface BearStore {
  user: Nullable<IUser>;
  setUser: (user: Nullable<IUser>) => void;
  logout: () => void;
}
export const useAuthStore = create(
  persist<BearStore>(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      logout: () => set(() => ({ user: null }))
    }),
    {
      name: 'user'
    }
  )
);
// export const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))
