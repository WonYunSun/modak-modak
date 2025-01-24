import FunnelHeader from '@components/common/FunnelHeader';
import PostEditForm from '@app/groups/[id]/posts/[postId]/edit/_components/PostEditForm';

const PostEditPage = () => {
  return (
    <div className="w-full h-screen max-w-[600px] mx-auto pb-2 border border-gray-200">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30 px-5">
        <FunnelHeader label="게시글 수정" />
      </div>

      <PostEditForm />
    </div>
  );
};

export default PostEditPage;
