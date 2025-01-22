import { create } from 'zustand';

interface GroupState {
  activeTab: string;
  previousGroupId: string | null;
  setActiveTab: (tab: string) => void;
  setPreviousGroupId: (id: string) => void;
  resetActiveTab: () => void; // Tab 초기화 함수
}

const useGroupStore = create<GroupState>((set) => ({
  activeTab: 'posts', // 기본값
  previousGroupId: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviousGroupId: (id) => set({ previousGroupId: id }),
  resetActiveTab: () => set({ activeTab: 'posts' }),
}));

export default useGroupStore;
