import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClient } from '@utils/supabase/client';

import { CommentsType } from '@hooks/comment/useComments';

const useCommentInput = (postId: string) => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const getUser = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;

    return user;
  };

  const createComment = async (content: string) => {
    try {
      const user = await getUser();

      const { data, error } = await supabase.from('comments').insert([
        {
          content,
          post_id: postId,
          user_id: user?.id,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: (content: string) => createComment(content),
    onMutate: async (newContent) => {
      const user = await getUser();
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      queryClient.setQueryData(['comments', postId], (old: CommentsType[]) => [
        ...old,
        {
          content: newContent,
          post_id: postId,
          user_id: user?.id,
          created_at: new Date().toISOString(),
          users: {
            id: user?.id,
            nickname: user?.user_metadata?.nickname,
            profile_image: user?.user_metadata?.profile_image,
          },
        },
      ]);

      return { previousComments };
    },
    onError: (_err, _newContent, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return mutation;
};

export default useCommentInput;
