import { getPosts } from '@app/queries/post/getPosts';
import { useQuery } from '@tanstack/react-query';
import { Database } from '@ts/supabase';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
type GroupType = Pick<Database['public']['Tables']['groups']['Row'], 'name' | 'description'>;
type UserType = Pick<Database['public']['Tables']['users']['Row'], 'nickname' | 'profile_image'>;
type ScheduleType = Pick<Database['public']['Tables']['schedules']['Row'],'name' | 'memo' | 'start_date' | 'end_date' | 'start_time'>;
type CommentCountType = { count: number };

export type PostWithRelations = {
  id: PostType['id'];
  content: PostType['content'];
  groups: GroupType;
  users: UserType;
  schedules: ScheduleType;
  comments: CommentCountType[];
};

export const useFetchGetPosts = (groupId: string) => {
  const { data, isPending, isError } = useQuery<PostWithRelations[]>({
    queryKey: [groupId, 'posts'],
    queryFn: () => getPosts(groupId)
  });

  return { data, isPending, isError };
};
