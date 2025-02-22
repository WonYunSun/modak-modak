import { create } from 'zustand';
import { TabType } from '@app/groups/[id]/_components/Tabs';

export type ScrollYType = {
  [key in TabType] : number;
};

export type SetScrollParams = { tab: TabType; position: number };

interface GroupState {
  activeTab: string;
  previousGroupId: string | null;
  scrollYPosition: ScrollYType;
  setActiveTab: (tab: string) => void;
  setPreviousGroupId: (id: string) => void;
  resetActiveTab: () => void; // Tab 초기화 함수
  setScrollYPosition: ({ tab, position }: SetScrollParams) => void;
}

const useGroupStore = create<GroupState>((set) => ({
  activeTab: 'posts', // 기본값
  previousGroupId: null,
  scrollYPosition: { posts: 0, photos: 0, schedules: 0 },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviousGroupId: (id) => set({ previousGroupId: id }),
  resetActiveTab: () => set({ activeTab: 'posts' }),
  setScrollYPosition: ({ tab, position }: SetScrollParams) =>
    set((state) => ({ scrollYPosition: { ...state.scrollYPosition, [tab]: position } })),
}));

export default useGroupStore;
