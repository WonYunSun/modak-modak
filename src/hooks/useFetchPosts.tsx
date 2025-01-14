import { useQuery } from '@tanstack/react-query';
import { Database } from '@ts/supabase';


export type PostType = Pick<
    Database['public']['Tables']['posts']['Row'],
    'id' | 'content'
>;

export type GroupType = Pick<
    Database['public']['Tables']['groups']['Row'],
    'name' | 'description'
>;

export type UserType = Pick<
    Database['public']['Tables']['users']['Row'],
    'nickname' | 'profile_image'
>;

export type ScheduleType = Pick<
    Database['public']['Tables']['schedules']['Row'],
    'name' | 'memo' | 'start_date' | 'end_date' | 'start_time'
>;

export type CommentCountType = {
  count: number;
};

export type PostWithRelations = {
    id: PostType['id'];
    content: PostType['content'];
    groups: GroupType;
    users: UserType;
    schedules: ScheduleType;
    comments: CommentCountType[];
};

export const useFetchGetPosts = () => {
  const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

  const { data, isPending, isError } = useQuery<PostWithRelations[]>({
    queryKey: [groupId, 'posts'],
    queryFn: async () => {
      const res = await fetch(`/api/posts`);
      const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};