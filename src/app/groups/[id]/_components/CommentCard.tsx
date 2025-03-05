'use client';

import Image from 'next/image';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import BottomSheet from '@components/common/BottomSheet';
import Button from '@components/common/Button';
import { Delete, Menu, ModificationNoCircle } from '@components/icons';

import useUser from '@hooks/common/useUser';
import useCommentHandler from '@hooks/comment/useCommentHandler';

import useCommentValueStore from '@stores/useCommentValueStore';
import useBottomSheetStore from '@stores/useBottomSheetStore';

import { Database } from '@ts/supabase';

export type Comment = Database['public']['Tables']['comments']['Row'];
export type User = Database['public']['Tables']['users']['Row'];

export type CommentUser = Omit<User, 'created_at'>;

interface CommentCardProps {
  comment: Comment & { users: CommentUser };
  postId: string;
  postCacheId: number;
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 시간 간격 정의
  const intervals = {
    년: 31536000,
    개월: 2592000,
    주: 604800,
    일: 86400,
    시간: 3600,
    분: 60,
    초: 1,
  };

  // 각 간격별로 확인
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return `${interval}${unit} 전`;
    }
  }

  return '방금 전';
};

const CommentCard = ({ comment, postId, postCacheId }: CommentCardProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const { setActionModalOpen } = useBottomSheetStore();

  const { setCheckModify, setCommentValue, setCommentId } = useCommentValueStore();

  const { deleteCommentMutation } = useCommentHandler(comment.id, postId, groupId, postCacheId);

  const { user } = useUser();

  const handleSheetOpen = () => {
    setOpenSheet(true);
    setActionModalOpen(true);
  };

  const handleSheetClose = () => {
    setOpenSheet(false);
    setActionModalOpen(false);
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(comment.id);
    setActionModalOpen(false);
  };

  const handleUpdateComment = () => {
    setCheckModify(true);
    setCommentValue(comment.content);
    setCommentId(comment.id);
    handleSheetClose();
  };

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={comment.users?.profile_image ? comment.users.profile_image : '/icons/profile-image.webp'}
            width={36}
            height={36}
            className="w-9 h-9 rounded-[50%]"
            alt="comment user profile"
          />
          <h4 className="text-base font-semibold leading-[140%]">{comment.users?.nickname}</h4>
          <span className="text-xs font-normal leading-[140%] text-gray-500">{formatTimeAgo(comment.created_at)}</span>
        </div>
        {user && user.id === comment.user_id && <Menu className="w-6 h-6 cursor-pointer" onClick={handleSheetOpen} />}
        <BottomSheet isOpen={openSheet} onClose={handleSheetClose} snapPoint={[0.2]}>
          <div className="w-full h-28 bg-white rounded-xl divide-y flex flex-col justify-start overflow-hidden">
            <Button
              type="button"
              label="수정하기"
              onClick={handleUpdateComment}
              className="cursor-pointer flex-1 px-3 py-4 flex items-center justify-start text-base font-normal gap-4 leading-[140%] bg-[#F4F4F5]"
            >
              <ModificationNoCircle className="w-6 h-6" />
            </Button>
            <Button
              type="button"
              label="삭제하기"
              onClick={handleDeleteComment}
              className="cursor-pointer flex-1 px-3 py-4 flex items-center justify-start text-base font-normal gap-4 leading-[140%] text-[#FF3B30] bg-[#F4F4F5]"
            >
              <Delete className="w-6 h-6" />
            </Button>
          </div>
        </BottomSheet>
      </div>
      {/* // 여기 클래스 수정함 */}
      <div>
        <p className="text-sm font-normal leading-[140%] text-gray-900 pl-11 whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
