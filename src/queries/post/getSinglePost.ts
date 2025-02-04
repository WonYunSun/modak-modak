'use server';

import { createClient } from '@utils/supabase/server';

import { Database } from '@ts/supabase';
import { Schedule } from '@app/groups/[id]/_components/ScheduleSelectSection';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'user_id' | 'content' | 'schedule_id'>;
type PostImageType = Pick<Database['public']['Tables']['post_images']['Row'], 'image_url'>;

export type PostWithSchedule = PostType & {
  schedules: Schedule[];
  post_images: PostImageType[];
};

// 게시글 불러오기
export const getSinglePost = async (postId: string): Promise<PostWithSchedule> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      user_id,
      content,
      schedule_id,
      schedules(id, name, memo, start_date, end_date, start_time),
      post_images(image_url)
    `
    )
    .eq('id', postId)
    .single();

  if (error || !data) throw new Error(`getSinglePost 게시글 수정 데이터 불러오는 중 에러 발생: ${error.message}`);

  return data;
};
