'use client';

import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import Post from './Post';
import { useParams, useRouter } from 'next/navigation';
import { ModificationLine } from '@components/icons';
import CountBar from './CountBar';
import { useFetchGetPosts } from '@hooks/post/useFetchPosts';

const PostList = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isError } = useFetchGetPosts(groupId);

  console.log('data', data);

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <section className="w-full flex flex-col mb-28">
      {/* 검색바 */}
      <SearchBar />
      {/* 게시글 수 */}
      <CountBar value={data?.length ?? 0} />

      {/* map으로 Post 컴포넌트 렌더링 */}
      {data?.map((post) => <Post key={post.id} post={post} />)}

      {/* 플로팅 버튼 */}
      <Button
        label="게시글 쓰기"
        className="floating-btn"
        type="button"
        onClick={() => router.push(`/groups/123/posts/new`)}
      >
        <ModificationLine />
      </Button>
    </section>
  );
};

export default PostList;
