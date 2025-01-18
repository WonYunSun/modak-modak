'use server';

import { createClient } from '@utils/supabase/server';

import { Database } from '@ts/supabase';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'user_id' | 'content' | 'schedule_id'>;
type PostImageType = Pick<Database['public']['Tables']['post_images']['Row'], 'image_url'>;

export type PostWithSchedule = {
  id: PostType['id'];
  user_id: PostType['user_id'];
  content: string;
  schedule_id: PostType['schedule_id'];
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
      post_images(image_url)
    `
    )
    .eq('id', postId)
    .single();
  // .order('create_at', { foreignTable: 'post_images', ascending: false });

  if (error) throw new Error(`getSinglePost 게시글 수정 데이터 불러오는 중 에러 발생: ${error.message}`);

  return data;
};
