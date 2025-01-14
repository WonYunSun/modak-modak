import { create } from 'zustand';

interface useBottomSheetProps {
  isActionModalOpen: boolean;
  setActionModalOpen: (isOpen: boolean) => void;
}

const useBottomSheetStore = create<useBottomSheetProps>((set) => ({
  isActionModalOpen: false,
  setActionModalOpen: (isOpen) => set({ isActionModalOpen: isOpen })
}));

export default useBottomSheetStore;
