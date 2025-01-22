import { create } from 'zustand';
import { UsersType } from '@ts/supabaseTableRowTypes';

type UserToManageStoreType = {
  userPermitted: boolean;
  selectedUser: UsersType['id'];
  setUserPermitted: (bool: boolean) => void;
  setSelectedUser: (userId: UsersType['id']) => void;
};

const useUserToManageStore = create<UserToManageStoreType>((set) => ({
  userPermitted: false,
  selectedUser: '',
  setUserPermitted: (bool) => {
    set({ userPermitted: bool });
  },
  setSelectedUser: (userId) => set({ selectedUser: userId }),
}));

export default useUserToManageStore;
