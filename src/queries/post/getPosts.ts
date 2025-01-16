'use server';

import { createClient } from '@utils/supabase/server';

import { Database } from '@ts/supabase';

export type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
export type GroupType = Pick<Database['public']['Tables']['groups']['Row'], 'name' | 'description'>;
export type UserType = Pick<Database['public']['Tables']['users']['Row'], 'nickname' | 'profile_image'>;
export type ScheduleType = Pick<
  Database['public']['Tables']['schedules']['Row'],
  'name' | 'memo' | 'start_date' | 'end_date' | 'start_time'
>;
export type CommentCountType = { count: number };
export type PostImageType = { image_url: string };

export type PostListType = {
  id: PostType['id'];
  content: PostType['content'];
  groups: GroupType;
  users: UserType;
  schedules: ScheduleType;
  comments: CommentCountType;
  post_images: PostImageType[];
};

// 게시글 리스트 불러오기
export const getPosts = async (groupId: string): Promise<PostListType[]> => {
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
      comments(count),
      post_images(image_url)
  `
    )
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`getPosts 게시글 리스트 데이터 불러오는 중 에러 발생: ${error.message}`);

  /*groups!inner, users!inner 등을 사용할 때 Supabase는 관계형 데이터를 배열 형태로 반환한다.
  배열 요소를 제거해서 data를 반환해 준다.
    {
      id: "123",
      content: "게시글 내용",
      groups: [{ name: "그룹1", description: "그룹 설명" }],
      users: [{ nickname: "사용자1", profile_image: "profile.jpg" }],
      schedules: [{ name: "일정1", start_date: "2024-01-01" }],
      comments: [{ count: 3 }]
    } */

  const formattedData: PostListType[] =
    data?.length > 0
      ? data.map((post) => ({
          id: post.id,
          content: post.content,
          groups: Array.isArray(post.groups) ? post.groups[0] : post.groups,
          users: Array.isArray(post.users) ? post.users[0] : post.users,
          schedules: Array.isArray(post.schedules) ? post.schedules[0] : post.schedules,
          comments: Array.isArray(post.comments) ? post.comments[0] : post.comments,
          post_images: post.post_images,
        }))
      : [];

  return formattedData;
};
