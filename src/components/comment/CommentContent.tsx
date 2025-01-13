'use client';

import CommentCard from '@components/comment/CommentCard';

import useComments from 'hooks/comment/useComments';

interface CommentContentProps {
  postId: string;
}

const CommentContent = ({ postId }: CommentContentProps) => {
  const { comments, isPending, isError } = useComments(postId);

  if (isPending) return <div>로딩중..</div>;
  if (isError) return <div>에러발생</div>;

  return (
    <div className="min-h-[80%] max-h-[80%] w-[92%] mx-auto pt-5 overflow-y-scroll scrollbar-hide">
      {comments && comments?.length > 0 ? (
        comments?.map((comment) => <CommentCard key={comment.id} comment={comment} postId={postId} />)
      ) : (
        <div className="flex items-center justify-center text-center pt-[6.25rem]">
          <div>
            <h3 className="text-xl font-semibold leading-[140%]">아직 댓글이 없습니다</h3>
            <p className="text-sm font-normal leading-[140%] text-gray-400 pt-2">댓글을 남겨보세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentContent;
