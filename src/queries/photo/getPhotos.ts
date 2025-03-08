'use server';

import { createClient } from '@utils/supabase/server';

export const getPhotos = async (groupId: string) => {
  try {
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

    if (error) {
      throw new Error(`getPhotos 모임 사진첩 불러오는 중 에러 발생: ${error.message}`);
    }

    // post_images 배열 정렬
    const formattedData = data.map((post) => ({
      ...post,
      post_images: Array.isArray(post.post_images)
        ? post.post_images.sort((a, b) => {
            const extractTimestamp = (url: string) => Number(url.split('/').pop()?.split('-')[0]);

            const timeA = extractTimestamp(a.image_url);
            const timeB = extractTimestamp(b.image_url);

            if (timeA === timeB) {
              return a.image_url.localeCompare(b.image_url);
            }
            return timeA - timeB;
          })
        : post.post_images,
    }));

    return formattedData;
  } catch (err) {
    console.error(err);
    throw new Error(`getPhotos 함수 실행 중 에러 발생: ${(err as Error).message}`);
  }
};
