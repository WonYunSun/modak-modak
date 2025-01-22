'use server';

import { createClient } from '@utils/supabase/server';

import { EditPostProps } from '@hooks/post/useFetchEditPost';

// 게시글 수정/저장하기
export const editPost = async (editpostData: EditPostProps) => {
  const supabase = await createClient();

  const postId = editpostData.postId;
  const content = editpostData.content;
  const scheduleId = editpostData.scheduleId;

  const { data, error } = await supabase
    .from('posts')
    .update({ content: content, schedule_id: scheduleId })
    .eq('id', postId);

  if (error) throw new Error(`editPost 게시글 저장하는 중 에러 발생: ${error.message}`);
  return data;
};
