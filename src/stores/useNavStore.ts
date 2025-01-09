import { create } from 'zustand';

type NavStore = {
  activeButton: string | null;
  setActiveButton: (button: string | null) => void;
};

const useNavStore = create<NavStore>((set) => ({
  activeButton: 'home', // 초기 활성 버튼
  setActiveButton: (button) => set({ activeButton: button })
}));

export default useNavStore;
