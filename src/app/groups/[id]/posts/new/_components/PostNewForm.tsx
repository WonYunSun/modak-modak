'use client';

import { useState } from 'react';
import { useUploadPost } from '@hooks/post/useUploadPost';

import { Plus } from '@components/icons';
import PhotoUpload from './PhotoUpload';
import PostTextArea from './PostTextArea';
import PostSubmitButton from './PostSubmitButton';

export const PostNewForm = () => {
  const [text, setText] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const uploadPostMutation = useUploadPost();

  const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886';
  const scheduleId = 'f81975bf-c02a-4bbd-9633-6f669c248ac9';
  const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

  // 게시글 업로드
  const handleUploadPost = async () => {
    try {
      await uploadPostMutation.mutateAsync({
        userId,
        content: text,
        scheduleId,
        groupId,
        files: selectedFiles,
      });
      alert('게시글이 성공적으로 업로드되었습니다.');
      setText('');
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      alert('게시글 업로드에 실패했습니다.');
    }
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
      <PostTextArea text={text} setText={setText} />
      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>
      <div className="w-full h-7 flex items-center px-5 my-3">
        {/* TODO: 일정 선택 화면 추가*/}
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>

      <PostSubmitButton disabled={selectedFiles.length === 0} />
    </form>
  );
};

export default PostNewForm;
