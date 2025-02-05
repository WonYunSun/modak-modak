'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import ScheduleCard from '@components/common/scheduleCard/ScheduleCard';
import SpinnerContainer from '@components/common/SpinnerContainer';
import PostTextArea from '@app/groups/[id]/posts/new/_components/PostTextArea';
import ScheduleSelectSection, { Schedule } from '@app/groups/[id]/_components/ScheduleSelectSection';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useFetchGetPost } from '@hooks/post/useFetchGetPost';
import { useFetchEditPost } from '@hooks/post/useFetchEditPost';
import useUser from '@hooks/common/useUser';

export const PostEditForm = () => {
  const [content, setContent] = useState<string>('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const router = useRouter();

  const { id, postId } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const editPostId = Array.isArray(postId) ? postId[0] : postId;

  const { data, isPending, isError } = useFetchGetPost(editPostId);
  const { user, isPending: isUserPending } = useUser();
  const { mutate: editPostMutation } = useFetchEditPost(groupId, editPostId);

  useEffect(() => {
    if (!data || !user) return;
    // 글 작성자와 로그인 유저가 일치하는지 확인
    if (data.user_id !== user.id) {
      router.push(`/groups/${groupId}`);
      return;
    }
    if (data) {
      setContent(data.content || '');
      const scheduleData = Array.isArray(data.schedules) ? data.schedules[0] : data.schedules;
      setSelectedSchedule(scheduleData);
    }
  }, [data, user]);

  const handleSubmit = () => {
    const editPostData = {
      postId: editPostId,
      content: content,
      scheduleId: selectedSchedule!.id,
    };

    editPostMutation(editPostData);
    router.push(`/groups/${groupId}`);
  };

  if (isPending || isUserPending) return <SpinnerContainer height={44} />;
  if (isError) return <p>오류가 발생했습니다.</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* 일정 수정하기 타이틀 */}
      <div className="w-full flex flex-col px-5 mt-[0.625rem]">
        <div className="flex mb-[7px]">
          <label className="font-semibold text-base">일정 수정하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
        <span className="text-sm text-gray-500 mb-4">추억을 공유하고 싶은 일정을 선택해주세요</span>

        <div onClick={() => setIsScheduleModalOpen(true)}>
          {selectedSchedule && (
            <ScheduleCard
              name={selectedSchedule.name}
              memo={selectedSchedule.memo}
              start_date={selectedSchedule.start_date}
              end_date={selectedSchedule.end_date}
              start_time={selectedSchedule.start_time}
              hasArrow={false}
            />
          )}
        </div>

        {/* 일정 선택하기 화면 */}
        {isScheduleModalOpen && (
          <ScheduleSelectSection
            setIsScheduleModalOpen={setIsScheduleModalOpen}
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
          />
        )}
      </div>

      {/* 사진 미리보기 */}
      <div className="w-full mt-5 px-5">
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="flex w-full justify-start">
          {data!.post_images.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '8.625rem' }}>
              <img src={url.image_url} alt={`미리보기-${index}`} className="w-[8.625rem] aspect-square object-cover" />
            </SwiperSlide>
          ))}
          {/* 미리보기 우측 그라디언트 효과 */}
          <div className="absolute top-0 right-0 w-[28px] h-[8.625rem] pointer-events-none bg-gradient-to-r from-transparent to-white z-10"></div>
        </Swiper>
      </div>

      {/* 글쓰기 */}
      <PostTextArea content={content} setContent={setContent} />

      <div className="fixed w-full max-w-[600px] m-auto px-5 bottom-3">
        <Button label="수정 완료" className="full-btn" type="submit" />
      </div>
    </form>
  );
};

export default PostEditForm;
