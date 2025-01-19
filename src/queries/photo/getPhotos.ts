'use server';

import { createClient } from '@utils/supabase/server';

export const getPhotos = async (groupId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
    id,
    post_images (*)
  `
    )
    .eq('group_id', groupId)
    .order('created_at', { ascending: false }) // posts 테이블의 created_at 기준 정렬
    .order('created_at', { foreignTable: 'post_images', ascending: false }); // post_images 테이블의 created_at 기준 정렬

  if (error) throw new Error(`getPhotos 모임 사진첩 불러오는 중 에러 발생: ${error.message}`);

  return data;
};
