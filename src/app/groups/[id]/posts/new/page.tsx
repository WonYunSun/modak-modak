import FunnelHeader from '@components/common/FunnelHeader';

import PostNewForm from '@app/groups/[id]/posts/new/_components/PostNewForm';

const PostNewPage = () => {
  return (
    <div className="w-full h-screen max-w-[600px] mx-auto pb-2 border border-gray-200">
      {/* 헤더 영역 */}
      <FunnelHeader label="게시글 쓰기" />
      <PostNewForm />
    </div>
  );
};

export default PostNewPage;
