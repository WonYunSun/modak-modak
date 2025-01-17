import { create } from 'zustand';

interface NewPostStore {
  content: string;
  selectedScheduleId: string;
  selectedFiles: File[];
  previewUrls: string[];
  setContent: (content: string) => void;
  setSelectedScheduleId: (id: string) => void;
  setSelectedFiles: (files: File[]) => void;
  setPreviewUrls: (urls: string[]) => void;
  reset: () => void;
}

export const useNewPostStore = create<NewPostStore>((set) => ({
  content: '',
  selectedScheduleId: '',
  selectedFiles: [],
  previewUrls: [],
  setContent: (content) => set({ content }),
  setSelectedScheduleId: (id) => set({ selectedScheduleId: id }),
  setSelectedFiles: (files) => set({ selectedFiles: files }),
  setPreviewUrls: (urls) => set({ previewUrls: urls }),
  reset: () =>
    set({
      content: '',
      selectedScheduleId: '',
      selectedFiles: [],
      previewUrls: [],
    }),
}));
