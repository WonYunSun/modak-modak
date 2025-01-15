import FunnelHeader from '@components/common/FunnelHeader';

import PostNewForm from './_components/PostNewForm';

const PostNewPage = () => {
  return (
    <div className="w-full px-5">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30 px-5">
        <FunnelHeader label="게시글 쓰기" />
      </div>

      <PostNewForm />
    </div>
  );
};

export default PostNewPage;
