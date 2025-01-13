'use client';

import { Sheet } from 'react-modal-sheet';

import CommentContent from '@components/comment/CommentContent';
import CommentInput from '@components/comment/CommentInput';

import useBottomSheetStore from '@stores/useBottomSheetStore';

interface CommentListProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const CommentList = ({ isOpen, onClose, postId }: CommentListProps) => {
  const { isActionModalOpen } = useBottomSheetStore();

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={isActionModalOpen ? [0.7] : [0.6]}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="w-[5.625rem] h-[0.375rem] rounded-xl mx-auto mt-[0.563rem] bg-[#e4e4e7]" />
          <h3 className="w-full mx-auto mt-9 text-xl text-center font-bold leading-[140%]">댓글</h3>
        </Sheet.Header>
        <Sheet.Content>
          <CommentContent postId={postId} />
          <CommentInput postId={postId} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} className="!bg-black !bg-opacity-80" />
    </Sheet>
  );
};

export default CommentList;
