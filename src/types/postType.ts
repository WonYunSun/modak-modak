import { Database } from '@ts/supabase';

export type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
export type GroupType = Pick<Database['public']['Tables']['groups']['Row'], 'name' | 'description'>;
export type UserType = Pick<Database['public']['Tables']['users']['Row'], 'id' | 'nickname' | 'profile_image'>;
export type ScheduleType = Pick<
  Database['public']['Tables']['schedules']['Row'],
  'name' | 'memo' | 'start_date' | 'end_date' | 'start_time'
>;
export type CommentCountType = { count: number };
export type PostImageType = { image_url: string };

type PostListType = {
  id: PostType['id'];
  content: PostType['content'];
  groups: GroupType;
  users: UserType;
  schedules: ScheduleType;
  comments: CommentCountType;
  post_images: PostImageType[];
};

export default PostListType;
