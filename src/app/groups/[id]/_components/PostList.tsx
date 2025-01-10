import Button from '@components/common/Button';
import SearchBar from '@app/groups/[id]/_components/SearchBar';
import { ModificationLine } from '@components/icons';
import CountBar from './CountBar';
import Post from './Post';

const PostList = () => {
  return (
    <section className="w-full flex flex-col">
      {/*검색바*/}
      <SearchBar />
      {/*게시글 수*/}
      <CountBar />
      {/*게시글*/}
      <Post />
      {/*플로팅 버튼*/}
      <Button label={'게시글 쓰기'} className={'floating-btn'} type={'button'}>
        <ModificationLine />
      </Button>
    </section>
  );
};

export default PostList;
