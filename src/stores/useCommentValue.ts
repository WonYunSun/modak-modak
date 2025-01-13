import { create } from 'zustand';

interface CommentValueState {
  checkModify: boolean;
  commentValue: string;
  commentId: string | null;
  setCheckModify: (modifyCheck: boolean) => void;
  setCommentValue: (value: string) => void;
  setCommentId: (id: string | null) => void;
  reset: () => void;
}

const useCommentValue = create<CommentValueState>((set) => ({
  checkModify: false,
  commentValue: '',
  commentId: null,
  setCheckModify: (modifyCheck) => set({ checkModify: modifyCheck }),
  setCommentValue: (value) => set({ commentValue: value }),
  setCommentId: (id) => set({ commentId: id }),
  reset: () => set({ checkModify: false, commentValue: '', commentId: null })
}));

export default useCommentValue;
