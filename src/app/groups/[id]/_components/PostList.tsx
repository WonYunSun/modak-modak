'use client';

import { useParams, useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import Post from './Post';
import CountBar from './CountBar';

import { ModificationLine } from '@components/icons';

import { useFetchGetPosts } from '@hooks/post/useFetchPosts';
import { NoPost } from '@app/groups/[id]/_components/NoPost';

export interface TabsProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const PostList = ({ setActiveTab }: TabsProps) => {
  const router = useRouter();

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isError } = useFetchGetPosts(groupId);

  if (isPending) return null;
  if (isError) return <p>에러 발생!</p>;

  return (
    <section className="w-full flex flex-col mb-28">
      {/* 검색바 */}
      <SearchBar />
      {/* 게시글 수 */}
      <CountBar value={data?.length ?? 0} />

      {/* data 없는 경우 NoPost 랜더링 또는 Post 랜더링 */}
      {!data || data.length === 0 ? (
        <NoPost setActiveTab={setActiveTab} />
      ) : (
        data.map((post) => <Post key={post.id} post={post} />)
      )}

      {/* 플로팅 버튼 */}
      <Button
        label="게시글 쓰기"
        className="floating-btn"
        type="button"
        onClick={() => router.push(`/groups/${groupId}/posts/new`)}
      >
        <ModificationLine />
      </Button>
    </section>
  );
};

export default PostList;
