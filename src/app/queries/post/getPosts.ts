'use server';

import { PostWithRelations } from '@hooks/post/useFetchPosts';
import { createClient } from '@utils/supabase/server';

const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

// 게시글 리스트 불러오기
export const getPosts = async (groupId: string): Promise<PostWithRelations[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
            id, 
            content,
            groups!inner(name, description),
            users!inner(nickname, profile_image),
            schedules!inner(name, memo, start_date, end_date, start_time),
            comments(count)
        `
    )
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`getPosts 게시글 리스트 데이터 불러오는 중 에러 발생: ${error.message}`);

  return data ?? [];
};
