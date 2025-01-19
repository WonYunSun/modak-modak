import { create } from 'zustand';

interface useHeaderStoreProps {
  groupName: string;
  setGroupName: (name: string) => void;
  reset: () => void;
}

const useHeaderStore = create<useHeaderStoreProps>((set) => ({
  groupName: '',
  setGroupName: (name) => set({ groupName: name }),
  reset: () => set({ groupName: '' }),
}));

export default useHeaderStore;
