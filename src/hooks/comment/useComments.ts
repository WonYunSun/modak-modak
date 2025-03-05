import { useQuery } from '@tanstack/react-query';

import fetchComments from '@queries/group/comments/fetchComments';

interface UseCommentParams {
  post_id: string;
}

const useComments = ({post_id}: UseCommentParams) => {
  const {
    data: comments,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['comments', post_id],
    queryFn: () => fetchComments(post_id),
    enabled: !!post_id,
  });

  return { comments, isPending, isError };
};

export default useComments;
