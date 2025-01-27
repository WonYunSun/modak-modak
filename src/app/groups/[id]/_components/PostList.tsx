'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import CountBar from '@app/groups/[id]/_components/CountBar';
import Post from '@app/groups/[id]/_components/Post';
import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';

import { ModificationLine } from '@components/icons';

import { useFetchGetPosts } from '@hooks/post/useFetchGetPosts';
import { useNewPostStore } from '@stores/useNewPostStore';

import NoPost from '@app/groups/[id]/_components/NoPost';
// import NoSearch from '@app/groups/[id]/_components/NoSearch';
import Spinner from '@components/common/Spinner';

const PostList = () => {
  const router = useRouter();

  const { reset } = useNewPostStore();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [search, setSearch] = useState<string | null>(null);
  const loadPostRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isPending, isError } = useFetchGetPosts(groupId);

  const posts = data?.pages.flat() || [];

  console.log('data', data);
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

  // 검색어에 따라 게시글 필터링
  // const filteredPosts = search
  //   ? data?.filter((post) => post.schedules?.name?.toLowerCase().includes(search.toLowerCase()))
  //   : data;

  if (isError) return <div>Error loading data</div>;
  if (isPending)
    return (
      <div className="w-full flex h-[calc(100vh-352px)] justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <section className="w-full flex flex-col mb-28">
      {/* 검색바 */}
      {/* 검색 기능 고도화 및 작동 방식 논의 필요 */}
      <SearchBar search={search} setSearch={setSearch} />
      {/* 게시글 수 */}
      <CountBar value={!posts || posts.length === 0 ? 0 : (posts?.length ?? 0)} />

      {!posts || posts.length === 0 ? (
        <NoPost /> // 데이터 자체가 없을 때
      ) : (
        //  : !posts || posts.length === 0 ? (
        //   <NoSearch /> // 검색 결과가 없을 때
        // )
        // Post 컴포넌트 랜더링
        posts.map((post) => <Post key={post.id} post={post} />)
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
            reset();
          }}
        >
          <ModificationLine />
        </Button>
      </div>
    </section>
  );
};

export default PostList;
