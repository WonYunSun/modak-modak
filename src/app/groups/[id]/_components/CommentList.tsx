'use client';

import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';

import CommentContent from '@app/groups/[id]/_components/CommentContent';
import CommentInput from '@app/groups/[id]/_components/CommentInput';

import useBottomSheetStore from '@stores/useBottomSheetStore';
import useIOSKeyboardHeight from '@hooks/comment/useIOSKeyboardHeight';

interface CommentListProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const CommentList = ({ isOpen, onClose, postId }: CommentListProps) => {
  const { isActionModalOpen } = useBottomSheetStore();
  const keyboardHeight = useIOSKeyboardHeight();

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      className={`max-w-[600px] mx-auto ${isActionModalOpen ? 'bottom-open transition-all' : ''}`}
    >
      <Sheet.Container
        className="comment-list transition-all"
        style={{ bottom: keyboardHeight > 0 ? keyboardHeight : 0 }}
      >
        <Sheet.Header>
          <div className="w-[5.625rem] h-[0.375rem] rounded-xl mx-auto mt-[0.563rem] bg-[#e4e4e7]" />
          <h3 className="w-full mx-auto mt-9 text-xl text-center font-bold leading-[140%]">댓글</h3>
        </Sheet.Header>
        <Sheet.Content>
          <CommentContent postId={postId} />
          <CommentInput postId={postId} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} className="modal-back-drop modal-sheet-back-drop !bg-black !bg-opacity-80" />
    </Sheet>
  );
};

export default CommentList;
