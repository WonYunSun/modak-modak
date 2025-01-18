'use client';

import { useParams, useRouter } from 'next/navigation';

import { Plus } from '@components/icons';
import Button from '@components/common/Button';

import useUploadPost from '@hooks/post/useUploadPost';
import useUser from '@hooks/useUser';
import { useNewPostStore } from '@stores/useNewPostStore';

import PostSelectScheduleCard from '@app/groups/[id]/posts/new/select/_components/PostSelectScheduleCard';
import PhotoUpload from '@app/groups/[id]/posts/new/_components/PhotoUpload';
import PostTextArea from '@app/groups/[id]/posts/new/_components/PostTextArea';

export const PostNewForm = () => {
  const { content, selectedScheduleId, selectedFiles, reset } = useNewPostStore();

  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  // 로그인 유저 확인
  const { user } = useUser();
  // if (isPending) return <Spinner />;

  // 게시글 업로드 로직
  const { mutate: uploadPostMutation } = useUploadPost();

  const handleUploadPost = () => {
    // FormData 사용
    const formData = new FormData();
    formData.append('userId', user!.id);
    formData.append('content', content);
    formData.append('scheduleId', selectedScheduleId);
    formData.append('groupId', groupId);

    // 이미지 각 파일을 FormData에 추가
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    uploadPostMutation(formData);
    reset();
    router.push(`/groups/${groupId}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUploadPost();
      }}
    >
      {/* 사진 업로드 컴포넌트 */}
      <PhotoUpload />

      {/* 글 입력 컴포넌트 */}
      <PostTextArea />

      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>

      {/* 일정 선택하기 버튼 */}
      <div
        className="w-full h-7 flex items-center px-5 my-[0.875rem]"
        onClick={() => router.push(`/groups/${id}/posts/new/select`)}
      >
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>

      <PostSelectScheduleCard />

      <div className="fixed w-full px-5 bottom-0">
        <Button
          label="작성 완료"
          className="full-btn"
          disabled={selectedFiles.length === 0 || selectedScheduleId === ''}
          type="submit"
        />
      </div>
    </form>
  );
};

export default PostNewForm;
