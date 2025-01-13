import FunnelHeader from '@components/common/FunnelHeader';
import { NewPostForm } from './_components/NewPostForm';

const PostNewPage = () => {


  return (
    <div className="w-full">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30">
        <FunnelHeader label="게시글 쓰기" />
      </div>

      <NewPostForm />

    </div>
  );
};

export default PostNewPage;
