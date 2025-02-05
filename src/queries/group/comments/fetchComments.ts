import { Comment, CommentUser } from '@app/groups/[id]/_components/CommentCard';

import { createClient } from '@utils/supabase/client';

export type CommentsType = Comment & { users: CommentUser };

const fetchComments = async (post_id: string): Promise<CommentsType[] | []> => {
  const supabase = createClient();

  try {
    const { data, error: commentError } = await supabase
      .from('comments')
      .select(
        `
    *,
    users(id, nickname, profile_image)
  `
      )
      .eq('post_id', post_id)
      .order('created_at', { ascending: false });

    if (commentError) {
      throw new Error('댓글을 가져오는 중 에러가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export default fetchComments;
