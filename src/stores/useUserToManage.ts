import { create } from 'zustand';
import { UsersType } from '@ts/supabaseTableRowTypes';

type UserToManageStoreType = {
  selectedUser: UsersType['id'];
  setSelectedUser: (userId: UsersType['id']) => void;
};

const useUserToManageStore = create<UserToManageStoreType>((set) => ({
  selectedUser: '',
  setSelectedUser: (userId) => set({ selectedUser: userId }),
}));

export default useUserToManageStore;
