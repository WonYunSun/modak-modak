import FunnelHeader from '@components/common/FunnelHeader';
import EditPostForm from './_components/PostEditForm';

const PostEditPage = () => {

  return (
    <div className="w-full">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30">
        <FunnelHeader label="게시글 수정" />
      </div>

      <EditPostForm />

    </div>
  );
};

export default PostEditPage;
