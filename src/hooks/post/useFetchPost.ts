import { editPost } from '@app/queries/post/editPost';
import { getPost } from '@app/queries/post/getPostById';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Database } from '@ts/supabase';

type PostType = Pick<Database['public']['Tables']['posts']['Row'], 'id' | 'content'>;
type ScheduleType = Pick<
  Database['public']['Tables']['schedules']['Row'],
  'name' | 'memo' | 'created_at' | 'start_date' | 'end_date' | 'start_time'
>;

export type PostWithSchedule = {
  id: PostType['id'];
  content: PostType['content'];
  schedules: ScheduleType;
};

// 게시글 수정 - 게시글 정보 가져오기
export const useFetchGetPost = (postId: string) => {
  const { data, isPending, isError } = useQuery<PostWithSchedule[]>({
    queryKey: [postId],
    queryFn: () => getPost(postId)
  });

  return { data, isPending, isError };
};

export const useFetchEditPost = (postId: string | string[], text: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await editPost(postId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postId });
    }
  });

  return { mutate };
};
