'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import CountBar from '@app/groups/[id]/_components/CountBar';
import Post from '@app/groups/[id]/_components/Post';
import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import Loading from '@components/common/Spinner';

import { ModificationLine } from '@components/icons';

import { useFetchGetPosts } from '@hooks/post/useFetchGetPosts';
import { useNewPostStore } from '@stores/useNewPostStore';

import NoPost from '@app/groups/[id]/_components/NoPost';
import NoSearch from '@app/groups/[id]/_components/NoSearch';

export interface TabsProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const PostList = ({ setActiveTab }: TabsProps) => {
  const router = useRouter();

  const { reset } = useNewPostStore();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const [search, setSearch] = useState<string | null>(null);

  const { data, isPending, isError } = useFetchGetPosts(groupId);

  if (isPending) return <Loading />;
  if (isError) return <p>에러 발생!</p>;

  // 검색어에 따라 게시글 필터링
  const filteredPosts = search
    ? data?.filter((post) => post.schedules?.name?.toLowerCase().includes(search.toLowerCase()))
    : data;

  return (
    <section className="w-full flex flex-col mb-28">
      {/* 검색바 */}
      {/* 검색 기능 고도화 및 작동 방식 논의 필요 */}
      <SearchBar search={search} setSearch={setSearch} />
      {/* 게시글 수 */}
      <CountBar value={!data || data.length === 0 ? 0 : (filteredPosts?.length ?? 0)} />

      {/* data 없는 경우 NoPost 랜더링 또는 Post 랜더링, 검색 결과 없는 경우 NoSearch*/}
      {!data || data.length === 0 ? (
        <NoPost setActiveTab={setActiveTab} /> // 데이터 자체가 없을 때
      ) : !filteredPosts || filteredPosts.length === 0 ? (
        <NoSearch /> // 검색 결과가 없을 때
      ) : (
        filteredPosts.map((post) => <Post key={post.id} post={post} />) // 검색 결과가 있을 때
      )}

      {/* 플로팅 버튼 */}
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
    </section>
  );
};

export default PostList;
