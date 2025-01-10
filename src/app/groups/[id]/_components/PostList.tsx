import Button from '@components/common/Button';
import { ModificationLine } from '@components/icons';

const PostList = () => {
  return (
    <div className="w-full bg-slate-200 flex flex-col">
      <div>
        <Button label={'게시글 쓰기'} className={'floating-btn'} type={'button'}>
          <ModificationLine />
        </Button>
      </div>
    </div>
  );
};

export default PostList;
