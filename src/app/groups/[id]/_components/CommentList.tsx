'use client';

import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';

import CommentContent from '@app/groups/[id]/_components/CommentContent';
import CommentInput from '@app/groups/[id]/_components/CommentInput';

import useBottomSheetStore from '@stores/useBottomSheetStore';

interface CommentListProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const CommentList = ({ isOpen, onClose, postId }: CommentListProps) => {
  const { isActionModalOpen } = useBottomSheetStore();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const visualViewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const newKeyboardHeight = windowHeight - visualViewportHeight;
      setKeyboardHeight(newKeyboardHeight);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Sheet isOpen={isOpen} onClose={onClose} className={`${isActionModalOpen ? 'bottom-open transition-all' : ''}`}>
      <Sheet.Container
        className={`comment-list transition-all ${keyboardHeight > 0 ? `!bottom-[${keyboardHeight}]` : '0'}`}
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
      <Sheet.Backdrop onTap={onClose} className="!bg-black !bg-opacity-80" />
    </Sheet>
  );
};

export default CommentList;

// 'use client';

// import { Sheet } from 'react-modal-sheet';

// import CommentContent from '@app/groups/[id]/_components/CommentContent';
// import CommentInput from '@app/groups/[id]/_components/CommentInput';

// import useBottomSheetStore from '@stores/useBottomSheetStore';

// interface CommentListProps {
//   isOpen: boolean;
//   onClose: () => void;
//   postId: string;
// }

// const CommentList = ({ isOpen, onClose, postId }: CommentListProps) => {
//   const { isActionModalOpen } = useBottomSheetStore();

//   return (
//     <Sheet isOpen={isOpen} onClose={onClose} className={`${isActionModalOpen ? 'bottom-open transition-all' : ''}`}>
//       <Sheet.Container className="comment-list">
//         <Sheet.Header>
//           <div className="w-[5.625rem] h-[0.375rem] rounded-xl mx-auto mt-[0.563rem] bg-[#e4e4e7]" />
//           <h3 className="w-full mx-auto mt-9 text-xl text-center font-bold leading-[140%]">댓글</h3>
//         </Sheet.Header>
//         <Sheet.Content>
//           <CommentContent postId={postId} />
//           <CommentInput postId={postId} />
//         </Sheet.Content>
//       </Sheet.Container>
//       <Sheet.Backdrop onTap={onClose} className="!bg-black !bg-opacity-80" />
//     </Sheet>
//   );
// };

// export default CommentList;
