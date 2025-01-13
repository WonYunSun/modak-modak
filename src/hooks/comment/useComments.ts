import { useQuery } from '@tanstack/react-query';

import { Comment, CommentUser } from '@components/comment/CommentCard';

import { createClient } from '@utils/supabase/client';

type CommentsType = Comment & { users: CommentUser };

const useComments = (post_id: string) => {
  const supabase = createClient();

  const fetchComments = async (post_id: string): Promise<CommentsType[] | []> => {
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
      *,
      users(id, nickname, profile_image)
    `
      )
      .eq('post_id', post_id);

    // 에러 처리 해주기
    if (error) throw new Error(error.message);

    return data;
  };

  const {
    data: comments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments', post_id],
    queryFn: () => fetchComments(post_id)
  });

  return { comments, isPending, isError };
};

export default useComments;
