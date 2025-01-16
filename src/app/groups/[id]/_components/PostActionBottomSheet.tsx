'use client';

import { useParams, useRouter } from 'next/navigation';

import { ModificationNoCircle, TrashCan } from '@components/icons';

interface PostActionBottomSheetProps {
  setBottomSheetPostId: React.Dispatch<React.SetStateAction<string | null>>;
  postId: string;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostActionBottomSheet = ({ setBottomSheetPostId, postId, setDeleteModal }: PostActionBottomSheetProps) => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const handleCloseModal = () => {
    setBottomSheetPostId(null);
  };

  // 게시글 수정하기
  const handleEditPost = () => {
    setBottomSheetPostId(null);
    router.push(`/groups/${groupId}/posts/${postId}/edit`); // 해당 postId를 포함한 수정 페이지로 이동
  };

  // 게시글 삭제하기
  const handleDeletePost = async () => {
    setBottomSheetPostId(null);
    setDeleteModal(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 z-[50] flex items-center justify-center"
        onClick={handleCloseModal}
      >
        <div className="min-w-full fixed bottom-0 left-0 h-[11.75rem] z-[60] bg-white rounded-tl-xl rounded-tr-xl flex flex-col justify-center items-center px-5">
          <div className="absolute top-2 w-[5.625rem] rounded-full bg-gray-200 h-[0.375rem]"></div>
          <div
            className="w-full flex items-center px-3 py-4 bg-gray-100 rounded-tl-xl rounded-tr-xl border-b border-gray-200 mt-8"
            onClick={handleEditPost}
          >
            <ModificationNoCircle /> <span className="ml-4 text-gray-900 text-base font-normal">수정하기</span>
          </div>
          <div
            className="w-full flex items-center px-3 py-4 bg-gray-100 text-gray-900 text-base font-normal rounded-bl-xl rounded-br-xl"
            onClick={handleDeletePost}
          >
            <TrashCan /> <span className="ml-4 text-[#FF3B30] text-base font-normal ">삭제하기</span>
          </div>
        </div>
      </div>
    </>
  );
};
