'use server';

import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/server';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
type GroupType = Pick<Database['public']['Tables']['groups']['Row'], 'name' | 'description'>;
type UserType = Pick<Database['public']['Tables']['users']['Row'], 'nickname' | 'profile_image'>;
type ScheduleType = Pick<
  Database['public']['Tables']['schedules']['Row'],
  'name' | 'memo' | 'start_date' | 'end_date' | 'start_time'
>;
type CommentCountType = { count: number };

export type PostWithRelations = {
  id: PostType['id'];
  content: PostType['content'];
  groups: GroupType[];
  users: UserType[];
  schedules: ScheduleType[];
  comments: CommentCountType[];
};

// 게시글 리스트 불러오기
export const getPosts = async (groupId: string): Promise<PostWithRelations[]> => {
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
            comments(count)
        `
    )
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`getPosts 게시글 리스트 데이터 불러오는 중 에러 발생: ${error.message}`);

  return data ?? [];
};
