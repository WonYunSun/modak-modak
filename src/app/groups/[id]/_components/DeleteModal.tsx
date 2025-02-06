'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@components/common/Button';

import { deletePost } from 'queries/post/deletePost';

interface modalProps {
  postId: string;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteAlert: () => void;
}

export const DeleteModal = ({ postId, setDeleteModal, openDeleteAlert }: modalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setDeleteModal(false);
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await deletePost(postId);
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['posts', groupId, ''] });
        queryClient.invalidateQueries({ queryKey: ['photos', groupId] });
        queryClient.invalidateQueries({ queryKey: ['postCount', groupId] });
        setDeleteModal(false);
        openDeleteAlert();
      }
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      setDeleteModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-[#FFF] rounded-[12px] w-[80%] max-w-md px-5 py-7 flex flex-col items-center justify-center"
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full px-4 py-6 mb-5">
            <div className="w-full text-lg font-semibold">정말 삭제하시겠어요?</div>
            <div className="w-full text-base font-semibold text-gray-500">삭제하시면 되돌릴 수 없어요</div>
          </div>
          <div className="grid grid-cols-10 gap-2 w-full px-2">
            <Button
              label="취소"
              className="modal-white-btn col-span-3"
              type="button"
              onClick={() => setDeleteModal(false)}
            />
            <Button label="확인" className="modal-full-btn col-span-7" type="button" onClick={handleDeletePost} />
          </div>
        </div>
      </div>
    </div>
  );
};
