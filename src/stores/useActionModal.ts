import { create } from 'zustand';

interface useActionModalProps {
  isActionModalOpen: boolean;
  setActionModalOpen: (isOpen: boolean) => void;
}

const useActionModal = create<useActionModalProps>((set) => ({
  isActionModalOpen: false,
  setActionModalOpen: (isOpen) => set({ isActionModalOpen: isOpen })
}));

export default useActionModal;
