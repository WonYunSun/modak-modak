'use server';

import { createClient } from '@utils/supabase/server';

// 게시글 삭제 함수
export const deletePost = async (postId: string | null) => {
  const supabase = await createClient();

  const { error } = await supabase.from('posts').delete().eq('id', postId);
  if (error) {
    console.error(`deletePost 에러 발생: ${error.message}`);
    throw new Error(`deletePost 게시글 삭제 실패: ${error.message}`);
  }

  return { success: true };
};
