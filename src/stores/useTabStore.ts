'use client';

import { create } from 'zustand';

interface TabState {
  activeTab: 'posts' | 'photos' | 'schedules';
  setActiveTab: (tab: 'posts' | 'photos' | 'schedules') => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 'posts',
  setActiveTab: (tab) => set({ activeTab: tab })
}));
