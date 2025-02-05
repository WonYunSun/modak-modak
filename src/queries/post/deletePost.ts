'use server';

import { createClient } from '@utils/supabase/server';

// 게시글 삭제 함수
export const deletePost = async (postId: string | null) => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
      console.error(`deletePost 에러 발생:`, error);
      throw new Error(`deletePost 게시글 삭제 실패: ${error.message}`);
    }

    return { success: true };
  } catch (err) {
    console.error(`deletePost: 서버에서 에러 발생`, err);
    throw new Error(`deletePost: 서버 에러가 발생했습니다.`);
  }
};
