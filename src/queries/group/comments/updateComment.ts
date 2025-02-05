import { createClient } from '@utils/supabase/client';

const updateComment = async (newContent: string, commentId: string) => {
  const supabase = createClient();

  try {
    const { data, error: commentUpdateError } = await supabase
      .from('comments')
      .update({ content: newContent })
      .eq('id', commentId)
      .select();

    if (commentUpdateError) {
      throw new Error('댓글 업데이트 중 에러가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export default updateComment;
