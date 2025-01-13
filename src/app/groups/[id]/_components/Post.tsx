'use client';

import PostScheduleCard from '@components/common/PostScheduleCard';
import Image from 'next/image';
import { Comments, Menu } from '@components/icons';
import { useState } from 'react';
import { PostActionBottomSheet } from './PostActionBottomSheet';

const Post = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const text =
    '관련된 최신 트렌드와 실무 팁을 공유하면서 제가 평소에 놓치고 있던 부분들을 새롭게 배울 수 있었어요. 다양한 관점을 통해 문제를 해결하는 방법을 배우며 제 시야가 한층 넓어진 느낌이었습니다. 무엇보다 비슷한 목표를 가진 사람들과 함께 소통하다 보니 동기 부여도 되고, 앞으로 더 열심히 공부하고 싶다는 의지가 생겼습니다. 😊';

  // 최대 3줄로 자르기
  const MAX_LENGTH = 80; // 글자 수 기준으로 조정 가능
  const truncatedText = text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;

  // const {data, isPending, isError} = useFetchPosts();
  // console.log('data', data);

  const handleComments = () => {
    return null;
  };

  return (
    <>
      <div className="w-full mb-20">
        {/* TODO: map 으로 반복  */}
        <article className="w-full mt-5 flex flex-col">
          <div className="flex items-center justify-between w-full h-8 mb-3">
            <div className="flex items-center space-x-3">
              {/* 동그란 프로필 이미지 */}
              <Image
                src="/icons/profile-image.webp"
                alt="프로필"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              {/* 닉네임 */}
              <span className="text-base font-semibold text-gray-900">닉네임</span>
            </div>
            {/* 메뉴 아이콘 */}
            <div onClick={() => setIsBottomSheetOpen(true)}>
              <Menu />
            </div>
          </div>

          {/* 사진 컴포넌트*/}
          <div className="w-full aspect-square mb-3  bg-slate-200"></div>

          {/* 글 내용*/}
          <div className="w-full text-sm mb-3">
            <p className="text-gray-800 text-sm break-words">
              {isExpanded ? (
                text
              ) : (
                <>
                  {truncatedText}
                  <span onClick={() => setIsExpanded(true)} className="text-gray-500 text-sm cursor-pointer">
                    더보기
                  </span>
                </>
              )}
            </p>

            {/* 접기 버튼 (전체 텍스트 노출 시만 보임) */}
            {isExpanded && (
              <button onClick={() => setIsExpanded(false)} className="text-gray-500 text-sm">
                접기
              </button>
            )}
          </div>

          {/* 일정 카드*/}
          <div className="w-full mb-3">
            <PostScheduleCard
              name={'3번째 모각코'}
              memo={'각자 모여서 공부하고 피드백 하기!'}
              start_date={'2025-01-11'}
              end_date={'2025-01-11'}
              start_time={'19:00'}
              created_at="2025-01-10"
              group_id="123"
              id="123"
            />
          </div>
          {/* 댓글*/}
          <div className="flex items-center h-6 text-xs" onClick={handleComments}>
            <Comments />
            <span className="ml-1 font-semibold">3</span>개 모두 보기
          </div>
        </article>
      </div>
      {/* 메뉴 수정 바텀시트 */}
      {isBottomSheetOpen && <PostActionBottomSheet setIsBottomSheetOpen={setIsBottomSheetOpen} />}
    </>
  );
};

export default Post;
