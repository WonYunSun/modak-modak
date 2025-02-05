'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from '@components/common/Button';
import SpinnerContainer from '@components/common/SpinnerContainer';

import CountBar from '@app/groups/[id]/_components/CountBar';
import Post from '@app/groups/[id]/_components/Post';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import NoPost from '@app/groups/[id]/_components/NoPost';
import NoSearchPost from '@app/groups/[id]/_components/NoSearchPost';

import { ModificationLine } from '@components/icons';

import { useFetchGetPosts } from '@hooks/post/useFetchGetPosts';
import { useFetchPostCount } from '@hooks/post/useFetchPostCount';

interface PostListProps {
  openDeleteAlert: () => void;
}

const PostList = ({ openDeleteAlert }: PostListProps) => {
  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const loadPostRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const searchQuery = searchTerm ? searchTerm : undefined;

  const { data, fetchNextPage, hasNextPage, isPending, isError } = useFetchGetPosts(groupId, searchQuery);
  const { data: totalCount, isPending: isCountLoading } = useFetchPostCount(groupId, searchQuery);

  const posts = data?.pages.flat() || [];

  useEffect(() => {
    if (!loadPostRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadPostRef.current) observer.observe(loadPostRef.current); // 관찰 시작
    return () => observer.disconnect(); // 관찰 종료
  }, [fetchNextPage, hasNextPage]);

  if (isError) return <div>Error loading data</div>;
  if (isPending) return <SpinnerContainer />;

  return (
    <section className="w-full flex flex-col mb-28 pt-1">
      {/* 검색바 */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* 게시글 수 */}
      <CountBar value={isCountLoading ? 0 : (totalCount ?? 0)} />

      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} openDeleteAlert={openDeleteAlert} />) // 데이터가 있으면 Post 리스트 렌더링
      ) : searchTerm ? (
        <NoSearchPost /> // 검색어가 있는데 데이터가 없으면 검색 결과 없음 표시
      ) : (
        <NoPost /> // 검색어가 없고 데이터도 없으면 게시글 없음 표시
      )}
      <div ref={loadPostRef}></div>

      {/* 플로팅 버튼 */}
      <div className="ml-[calc(100%-124px)]">
        <Button
          label="게시글 쓰기"
          className="floating-btn"
          type="button"
          onClick={() => {
            router.push(`/groups/${groupId}/posts/new`);
          }}
        >
          <ModificationLine />
        </Button>
      </div>
    </section>
  );
};

export default PostList;
