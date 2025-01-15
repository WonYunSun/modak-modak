'use client';

import Button from '@components/common/Button';
import { DeletePhoto, Plus, PlusGray } from '@components/icons';
import { useState } from 'react';
import { useUploadPost } from '@hooks/post/useUploadPost';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const PostNewForm = () => {
  const [text, setText] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const uploadPostMutation = useUploadPost();

  const userId = 'af747db7-11c9-4bbc-800b-9c02eb04a886';
  const scheduleId = 'f81975bf-c02a-4bbd-9633-6f669c248ac9';
  const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

  // 사진 선택
  const handleSelectPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (isEnglishFilename(file.name)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`한글 파일명 사진은 업로드할 수 없어요. \n${invalidFiles.join(', ')}`);
      return;
    }

    // 삭제한 파일 수를 고려하여 새로운 파일 추가 가능 여부 계산
    const remainingSlots = 10 - selectedFiles.length;
    if (validFiles.length > remainingSlots) {
      alert('최대 10개의 이미지만 선택할 수 있습니다.');
      validFiles.splice(remainingSlots);
    }

    // 미리보기 URL 및 파일 리스트 업데이트
    const newUrls = validFiles.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  // 영어 파일명 검사 정규식 (알파벳, 숫자, 일부 기호만 허용)
  const isEnglishFilename = (filename: string) => {
    return /^[a-zA-Z0-9._-]+$/.test(filename);
  };

  // 이미지 삭제 함수
  const handleDelete = (indexToDelete: number) => {
    setPreviewUrls((prev) => prev.filter((_, index) => index !== indexToDelete));
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // 게시글 업로드
  const handleUploadPost = async () => {
    try {
      await uploadPostMutation.mutateAsync({
        userId,
        content: text,
        scheduleId,
        groupId,
        files: selectedFiles
      });
      console.log('selectedFiles', selectedFiles);
      alert('게시글이 성공적으로 업로드되었습니다.');
      setText('');
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      console.log('selectedFiles', selectedFiles);
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
      {/* 사진 추가 */}
      <div className="w-full flex mt-[4.5rem] px-5">
        <label className="w-[5.25rem] aspect-square bg-[#F1F1F1] flex items-center justify-center mr-[1px]">
          <input type="file" multiple accept="image/*" onChange={handleSelectPhoto} className="hidden" />
          <div className="flex flex-col">
            {/* + 아이콘 */}
            <PlusGray />
            <div className="text-gray-500 text-[10px] w-6 flex justify-center">{previewUrls.length}/10</div>
          </div>
        </label>
        {/* Swiper 슬라이더 (미리보기) */}
        {previewUrls.length > 0 && (
          <Swiper spaceBetween={1} slidesPerView={'auto'} className="flex w-full justify-start">
            {previewUrls.map((url, index) => (
              <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '5.25rem' }}>
                <img src={url} alt={`미리보기-${index}`} className="w-[5.25rem] aspect-square object-cover" />
                {/* 삭제 버튼 */}
                <Button
                  label=""
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="absolute top-0 right-0 p-[6px] rounded-full bg-[#00000080]"
                >
                  <DeletePhoto />
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* 글쓰기 */}
      <div className="w-full mt-5 px-5">
        <textarea
          className="w-full h-60 p-[0.625rem] border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 resize-none"
          placeholder={`공유하고 싶은 추억을 자유롭게 작성해주세요\n(최대 2000자)`}
          maxLength={2000}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>

      <div className="w-full h-7 flex items-center px-5 my-3">
        {/* TODO: 일정 선택 화면 추가*/}
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>

      <div className="w-full fixed bottom-0 px-5 pb-2">
        <Button label="작성 완료" className="full-btn" disabled={selectedFiles.length === 0} type="submit" />
      </div>
    </form>
  );
};

export default PostNewForm;
