import { createClient } from '@utils/supabase/client';

const deleteComment = async (commentId: string) => {
  const supabase = createClient();

  try {
    const { error: commentDeleteError } = await supabase.from('comments').delete().eq('id', commentId);

    if (commentDeleteError) {
      throw new Error('댓글 삭제 중 에러가 발생했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export default deleteComment;
