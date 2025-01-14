'use client';

import PostScheduleCard from '@components/common/scheduleCard/PostScheduleCard';
import Image from 'next/image';
import { Comments, Menu } from '@components/icons';
import { useState } from 'react';
import { PostActionBottomSheet } from './PostActionBottomSheet';
import { PostWithRelations } from '@hooks/post/useFetchPosts';

interface PostProps {
  post: PostWithRelations;
}

const Post = ({ post }: PostProps) => {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const [bottomSheetPostId, setBottomSheetPostId] = useState<string | null>(null);

  // 글 내용 3줄로 줄이기 (최대 80자)
  const truncateText = (text: string | null, postId: string) => {
    if (!text) return '';
    const MAX_LENGTH = 80;
    return text.length <= MAX_LENGTH || isExpanded[postId] ? text : `${text.slice(0, MAX_LENGTH)}...`;
  };

  // 더보기 / 접기 토글 함수
  const toggleExpand = (postId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleComments = () => {
    return null;
  };

  return (
    <>
      <article key={post.id} className="w-full mt-5 flex flex-col">
        <div className="flex items-center justify-between w-full h-8 mb-3">
          <div className="flex items-center space-x-3">
            {/* 동그란 프로필 이미지 */}
            <Image
              src={post.users.profile_image}
              alt="프로필"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            {/* 닉네임 */}
            <span className="text-base font-semibold text-gray-900">{post.users.nickname}</span>
          </div>
          {/* 메뉴 아이콘 */}
          <div onClick={() => setBottomSheetPostId(post.id)}>
            <Menu />
          </div>
        </div>

        {/* 사진 컴포넌트 */}
        <div className="w-full aspect-square mb-3 bg-slate-200"></div>

        {/* 글 내용 */}
        <div className="w-full text-sm mb-3">
          <p className="text-gray-800 text-sm break-words">
            {truncateText(post.content, post.id)}
            {post.content && post.content.length > 80 && (
              <span onClick={() => toggleExpand(post.id)} className="text-gray-500 text-sm cursor-pointer ml-1">
                {isExpanded[post.id] ? '접기' : '더보기'}
              </span>
            )}
          </p>
        </div>

        {/* 일정 카드 */}
        <div className="w-full mb-3">
          <PostScheduleCard
            name={post.schedules.name}
            memo={post.schedules.memo}
            start_date={post.schedules.start_date}
            end_date={post.schedules.end_date}
            start_time={post.schedules.start_time}
          />
        </div>

        {/* 댓글 */}
        <div className="flex items-center h-6 text-xs" onClick={handleComments}>
          <Comments />
          <span className="ml-1 font-semibold">
            {post.comments.length > 0 ? `${post.comments[0].count}개 모두 보기` : '댓글 남기기'}
          </span>
        </div>
      </article>

      {/* 메뉴 수정 바텀시트 */}
      {bottomSheetPostId && (
        <PostActionBottomSheet setBottomSheetPostId={setBottomSheetPostId} postId={bottomSheetPostId} />
      )}
    </>
  );
};

export default Post;
