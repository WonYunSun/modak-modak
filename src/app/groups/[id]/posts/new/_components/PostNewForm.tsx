'use client';

import { useParams, useRouter } from 'next/navigation';

import { PlusGray } from '@components/icons';
import Button from '@components/common/Button';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';

import PhotoUpload from '@app/groups/[id]/posts/new/_components/PhotoUpload';
import PostTextArea from '@app/groups/[id]/posts/new/_components/PostTextArea';
import ScheduleSelectSection, { Schedule } from '@app/groups/[id]/_components/ScheduleSelectSection';

import useUploadPost from '@hooks/post/useUploadPost';
import useUser from '@hooks/useUser';

import { useState } from 'react';

export const PostNewForm = () => {
  const [content, setContent] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  // 로그인 유저 확인
  const { user } = useUser();

  // 게시글 업로드 로직
  const { mutate: uploadPostMutation } = useUploadPost();

  const handleUploadPost = () => {
    // FormData 사용
    const formData = new FormData();
    formData.append('userId', user!.id);
    formData.append('content', content);
    formData.append('scheduleId', selectedSchedule!.id);
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
      {/* 일정 선택하기 타이틀 */}
      <div className="w-full flex flex-col px-5 mt-[0.625rem]">
        <div className="flex">
          <label className="font-semibold text-xl">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
        <span className="text-base text-gray-500 mb-4">어떤 날의 추억을 공유해 볼까요?</span>

        <div onClick={() => setIsScheduleModalOpen(true)} className="cursor-pointer">
          {selectedSchedule ? (
            <ScheduleCard
              name={selectedSchedule.name}
              memo={selectedSchedule.memo}
              start_date={selectedSchedule.start_date}
              end_date={selectedSchedule.end_date}
              start_time={selectedSchedule.start_time}
            />
          ) : (
            <div className="w-full h-[4.875rem] flex flex-col items-center  justify-center border border-gray-300 rounded-xl cursor-pointer">
              <PlusGray />
            </div>
          )}
        </div>

        {/* 일정 선택하기 화면 */}
        {isScheduleModalOpen && (
          <ScheduleSelectSection
            setIsScheduleModalOpen={setIsScheduleModalOpen}
            setSelectedSchedule={setSelectedSchedule}
          />
        )}
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] mt-[15px]"></div>

      {/* 게시글 타이틀 */}
      <div className="w-full flex flex-col px-5 mt-6 mb-5">
        <div className="flex">
          <label className="font-semibold text-xl">게시글</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
        <span className="text-base text-gray-500">우리의 추억을 이미지로 남겨주세요</span>
      </div>

      {/* 사진 업로드 컴포넌트 */}
      <PhotoUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

      {/* 글 입력 컴포넌트 */}
      <PostTextArea content={content} setContent={setContent} />

      <div className="fixed w-full max-w-[600px] m-auto px-5 bottom-0">
        <Button
          label="작성 완료"
          className="full-btn"
          disabled={selectedFiles.length === 0 || selectedSchedule === null}
          type="submit"
        />
      </div>
    </form>
  );
};

export default PostNewForm;
