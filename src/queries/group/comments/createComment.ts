import { createClient } from '@utils/supabase/client';

const createComment = async (content: string, postId: string, userId: string) => {
  const supabase = createClient();

  try {
    const { data, error: commentInsertError } = await supabase.from('comments').insert([
      {
        content,
        post_id: postId,
        user_id: userId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (commentInsertError) {
      throw new Error('댓글 삽입 중 에러가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export default createComment;
