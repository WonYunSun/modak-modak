import { create } from 'zustand';

interface NewPostStore {
  content: string;
  selectedScheduleId: string;
  setContent: (content: string) => void;
  setSelectedScheduleId: (id: string) => void;
  reset: () => void;
}

export const useNewPostStore = create<NewPostStore>((set) => ({
  content: '',
  selectedScheduleId: '',
  setContent: (content) => set({ content }),
  setSelectedScheduleId: (id) => set({ selectedScheduleId: id }),
  reset: () => set({ content: '', selectedScheduleId: '' }),
}));
