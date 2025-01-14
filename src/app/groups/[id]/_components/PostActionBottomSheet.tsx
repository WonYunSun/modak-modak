'use client';

import { ModificationNoCircle, TrashCan } from '@components/icons';
import { useRouter } from 'next/navigation';

interface PostActionBottomSheetProps {
  setBottomSheetPostId: React.Dispatch<React.SetStateAction<string | null>>;
  postId: string;
}

export const PostActionBottomSheet = ({ setBottomSheetPostId, postId }: PostActionBottomSheetProps) => {
  const router = useRouter();

  const handleCloseModal = () => {
    setBottomSheetPostId(null);
  };

  // 게시글 수정하기
  const handleEditPost = () => {
    setBottomSheetPostId(null);
    router.push(`/groups/123/posts/${postId}/edit`); // 해당 postId를 포함한 수정 페이지로 이동
  };

  // 게시글 삭제하기
  const handleDeletePost = async () => {
    // if (confirm('정말로 삭제하시겠습니까?')) {
    //   try {
    //     const response = await fetch(`/api/posts/${postId}`, {
    //       method: 'DELETE'
    //     });
    //     if (response.ok) {
    //       alert('게시글이 삭제되었습니다.');
    //       setBottomSheetPostId(null);
    //       router.push('/groups/123'); // 메인 페이지로 이동
    //     } else {
    //       const errorData = await response.json();
    //       alert(`삭제 실패: ${errorData.error}`);
    //     }
    //   } catch (error) {
    //     console.error('게시글 삭제 오류:', error);
    //     alert('게시글 삭제 중 오류가 발생했습니다.');
    //   }
    // }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 z-[100] flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div className="min-w-full fixed bottom-0 left-0 h-[11.75rem] z-[100] bg-white rounded-tl-xl rounded-tr-xl flex flex-col justify-center items-center px-5">
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
        <div></div>
      </div>
    </div>
  );
};
