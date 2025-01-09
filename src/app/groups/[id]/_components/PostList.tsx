import Button from '@components/common/Button';
import { ModificationLine } from '@components/icons';

const PostList = () => {
  return (
    <div className="w-full bg-slate-200">
      <h2 className="text-lg font-semibold">게시글 리스트</h2>
      <p className="h-[2000px]">게시글 리스트</p>
      <div>
        <Button label={'게시글 쓰기'} className={'floating-btn'} type={'button'}>
          <ModificationLine />
        </Button>
      </div>
    </div>
  );
};

export default PostList;
