'use server';

import { createClient } from '@utils/supabase/server';

// 게시글 수정/저장하기
export const editPost = async (postId: string | string[], text: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('posts').update({ content: text }).eq('id', postId);

  if (error) throw new Error(`editPost 게시글 저장하는 중 에러 발생: ${error.message}`);
  return data;
};
