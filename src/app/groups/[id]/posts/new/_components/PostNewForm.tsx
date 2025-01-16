'use client';

import { useRef, useState } from 'react';

import { Plus } from '@components/icons';
import PhotoUpload from './PhotoUpload';
import PostTextArea from './PostTextArea';
import Button from '@components/common/Button';
import { useParams, useRouter } from 'next/navigation';
import useUploadPost from '@hooks/post/useUploadPost';

export const PostNewForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { mutate: uploadPostMutation } = useUploadPost();

  // TODO: userId, scheduleId 연결 필요
  const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886';
  const scheduleId = 'f81975bf-c02a-4bbd-9633-6f669c248ac9';

  const handleUploadPost = async () => {
    const content = textareaRef.current?.value || '';
    // FormData 사용
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', content);
    formData.append('scheduleId', scheduleId);
    formData.append('groupId', groupId);

    // 이미지 각 파일을 FormData에 추가
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    uploadPostMutation(formData);
    router.push(`/groups/${groupId}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUploadPost();
      }}
    >
      <PhotoUpload
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        previewUrls={previewUrls}
        setPreviewUrls={setPreviewUrls}
      />
      <PostTextArea />

      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>
      <div
        className="w-full h-7 flex items-center px-5 my-3"
        onClick={() => router.push(`/groups/${id}/posts/new/select`)}
      >
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>
      <Button
        label="작성 완료"
        className="full-btn fixed bottom-0 px-5 pb-2"
        disabled={selectedFiles.length === 0}
        type="submit"
      />
    </form>
  );
};

export default PostNewForm;
