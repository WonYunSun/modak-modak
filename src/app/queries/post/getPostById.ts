'use server';

import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/server';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
type ScheduleType = Pick<
  Database['public']['Tables']['schedules']['Row'],
  'name' | 'memo' | 'created_at' | 'start_date' | 'end_date' | 'start_time'
>;

export type PostWithSchedule = {
  id: PostType['id'];
  content: PostType['content'];
  schedules: ScheduleType[];
};

// 게시글 불러오기
export const getPost = async (postId: string): Promise<PostWithSchedule> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        id,
        content,
        schedules!inner(
          name,
          memo,
          created_at,
          start_date,
          end_date,
          start_time
          )
      `
    )
    .eq('id', postId)
    .single();

  if (error) throw new Error(`getPost 게시글 데이터 불러오는 중 에러 발생: ${error.message}`);

  return data;
};
