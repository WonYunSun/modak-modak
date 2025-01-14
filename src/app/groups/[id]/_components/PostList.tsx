'use client';

import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import CountBar from './CountBar';
import Post from './Post';
import { useRouter } from 'next/navigation';
import { ModificationLine } from '@components/icons';

const PostList = () => {
  const router = useRouter();

  return (
    <>
      <section className="w-full flex flex-col">
        {/*검색바*/}
        <SearchBar />
        {/*게시글 수*/}
        <CountBar value={36} />
        {/*게시글*/}
        <Post />
        {/*플로팅 버튼*/}
        <Button
          label={'게시글 쓰기'}
          className={'floating-btn'}
          type={'button'}
          onClick={() => router.push(`/groups/123/posts/new`)}
        >
          <ModificationLine />
        </Button>
      </section>
    </>
  );
};

export default PostList;
