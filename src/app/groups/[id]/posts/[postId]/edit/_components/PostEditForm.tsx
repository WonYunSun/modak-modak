'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import { Plus } from '@components/icons';

import { useFetchGetPost } from '@hooks/post/useFetchGetPost';
//import useUser from '@hooks/useUser';
import PostSelectScheduleCard from '@app/groups/[id]/posts/new/select/_components/PostSelectScheduleCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useNewPostStore } from '@stores/useNewPostStore';
import { useFetchEditPost } from '@hooks/post/useFetchEditPost';
import Spinner from '@components/common/Spinner';

export const PostEditForm = () => {
  const [text, setText] = useState<string>('');

  const router = useRouter();
  const { content, setContent, selectedScheduleId, setSelectedScheduleId, setPreviewUrls, reset } = useNewPostStore();

  const { id, postId } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const editPostId = Array.isArray(postId) ? postId[0] : postId;

  const { data, isPending, isError } = useFetchGetPost(editPostId);
  // const { user } = useUser();
  const { mutate: editPostMutation } = useFetchEditPost(groupId, editPostId);

  // 일정 선택 후에도 입력한 데이터 변화 없도록 세팅
  useEffect(() => {
    // 게시글 수정 페이지에 url로 접근한 경우, 글 작성자 외 접근 차단
    // if (data?.user_id !== user?.id) {
    //   return router.push(`/groups/${groupId}`);
    // }

    // 랜더링 시 일정 id 전역으로 세팅
    if (data?.schedule_id && !selectedScheduleId) {
      setSelectedScheduleId(data.schedule_id);
    }
    // 랜더링 시 입력한 text 화면에 세팅
    if (data?.content && !content) {
      setText(data.content);
    } else {
      setText(content);
    }
  }, [data]);

  if (isPending) return <Spinner />;
  if (isError) return <p>오류가 발생했습니다.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // 일정 선택할 때 게시글 내용 전역으로 저장하기
  const handleSelcetSchedule = () => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return router.back();
    }

    setSelectedScheduleId(data.schedule_id);
    setContent(text);
    setPreviewUrls(data.post_images.map((image) => image.image_url));
    router.push(`/groups/${groupId}/posts/${editPostId}/edit/select`);
  };

  const handleSubmit = () => {
    const editPostData = {
      postId: editPostId,
      content: text,
      scheduleId: selectedScheduleId,
    };

    editPostMutation(editPostData);
    router.push(`/groups/${groupId}`);

    reset();
  };
  //TODO: 로그인 사용자와 글쓴사람 일치하지 않는 경우 처리 필요

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* 사진 추가 */}
      <div className="w-full mt-[4.5rem] px-5">
        <Swiper spaceBetween={1} slidesPerView={'auto'} className="flex w-full justify-start">
          {data!.post_images.map((url, index) => (
            <SwiperSlide key={index} style={{ flex: '0 0 auto', width: '5.25rem' }}>
              <img src={url.image_url} alt={`미리보기-${index}`} className="w-[5.25rem] aspect-square object-cover" />
            </SwiperSlide>
          ))}
          {/* 미리보기 우측 그라디언트 효과 */}
          <div className="absolute top-0 right-0 w-[28px] h-[5.25rem] pointer-events-none bg-gradient-to-r from-transparent to-white z-10"></div>
        </Swiper>
      </div>

      {/* 글쓰기 */}
      <div className="w-full mt-5 px-5">
        <textarea
          className="w-full h-60 p-[0.625rem] border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 resize-none"
          placeholder={`공유하고 싶은 추억을 자유롭게 작성해주세요\n(최대 2000자)`}
          maxLength={2000}
          value={text}
          onChange={handleChange}
        />
      </div>

      <div className="w-full h-2 bg-[#F1F1F1] mt-[3.75rem]"></div>

      {/* 일정 선택하기 버튼 */}
      <div className="w-full h-7 flex items-center px-5 my-[0.875rem]" onClick={handleSelcetSchedule}>
        <Plus className="w-6 h-6 mr-2" />
        <div className="flex">
          <label className="font-semibold text-base">일정 선택하기</label>
          <p className="text-[#FF3B30] ml-1">*</p>
        </div>
      </div>

      <PostSelectScheduleCard />

      <div className="fixed w-full px-5 bottom-0">
        <Button label="수정 완료" className="full-btn" type="submit" />
      </div>
    </form>
  );
};

export default PostEditForm;
