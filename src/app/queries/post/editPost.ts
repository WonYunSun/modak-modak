'use server';

import { PostWithSchedule } from '@hooks/post/useFetchPost';
import { createClient } from '@utils/supabase/server';

// 게시글 수정/저장하기
export const editPost = async (postId: string | string[], text: string): Promise<PostWithSchedule | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
  .from('posts')
  .update({ content: text })
  .eq('id', postId);

  if (error) throw new Error(`getPost 게시글 데이터 불러오는 중 에러 발생: ${error.message}`);

};
