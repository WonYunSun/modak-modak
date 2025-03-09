'use server';

import { createClient } from '@utils/supabase/server';
import { PostListType } from '@ts/postType';

// interface getPostParams {
//   groupId: string;
//   offset: number;
//   limit: number;
//   postCacheId: number;
//   searchTerm?: string;
// }
// 게시글 리스트 불러오기
export const getPosts = async (
  groupId: string,
  offset: number,
  limit: number,
  searchTerm?: string
): Promise<PostListType[]> => {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('posts')
      .select(
        `
      id, 
      content,
      users!inner(id, nickname, profile_image),
      schedules!inner(name, memo, start_date, end_date, start_time),
      comments(count),
      post_images(image_url)
  `
      )
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (searchTerm) {
      query = query.ilike('schedules.name', `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`getPosts: 게시글 리스트 데이터 불러오는 중 에러 발생`, error);
      throw new Error(`getPosts 게시글 리스트 데이터 불러오는 중 에러 발생: ${error.message}`);
    }

    /*groups!inner, users!inner 등을 사용할 때 Supabase는 관계형 데이터를 배열 형태로 반환한다.
  배열 요소를 제거해서 data를 반환해 준다.
    {
      id: "123",
      content: "게시글 내용",
      users: [{ nickname: "사용자1", profile_image: "profile.jpg" }],
      schedules: [{ name: "일정1", start_date: "2024-01-01" }],
      comments: [{ count: 3 }]
    } */
    const formattedData: PostListType[] =
      data.map((post) => ({
        id: post.id,
        content: post.content,
        users: Array.isArray(post.users) ? post.users[0] : post.users,
        schedules: Array.isArray(post.schedules) ? post.schedules[0] : post.schedules,
        comments: Array.isArray(post.comments) ? post.comments[0] : post.comments,
        post_images: Array.isArray(post.post_images)
          ? post.post_images.sort((a, b) => {
              // 파일명에서 시간 부분 추출 후 비교
              const extractTimestamp = (url: string) => Number(url.split('/').pop()?.split('-')[0]);

              const timeA = extractTimestamp(a.image_url);
              const timeB = extractTimestamp(b.image_url);

              // 시간이 같으면 파일명 순으로 비교
              if (timeA === timeB) {
                return a.image_url.localeCompare(b.image_url);
              }
              return timeA - timeB;
            })
          : post.post_images,
      })) || [];

    return formattedData;
  } catch (err) {
    console.error(`getPosts: 서버에서 예기치 못한 에러 발생`, err);
    throw new Error(`getPosts: 서버 에러가 발생했습니다.`);
  }
};
