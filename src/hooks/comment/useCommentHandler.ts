import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClient } from '@utils/supabase/client';

import { CommentsType } from '@hooks/comment/useComments';

const useCommentHandler = (commentId: string, postId: string) => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const deleteComment = async (commentId: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) throw error;
  };

  const updateComment = async (newContent: string) => {
    const { data, error } = await supabase
      .from('comments')
      .update({ content: newContent, updated_at: new Date().toISOString() })
      .eq('id', commentId)
      .select();

    if (error) throw error;

    return data;
  };

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      queryClient.setQueryData(['comments', postId], (old: CommentsType[]) =>
        old?.filter((comment) => comment.id !== commentId)
      );

      return { previousComments };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: (newContent: string) => updateComment(newContent),
    onMutate: async (newContent) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      queryClient.setQueryData(['comments', postId], (old: CommentsType[]) =>
        old?.map((comment) => (comment.id === commentId ? { ...comment, content: newContent } : comment))
      );

      return { previousComments };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  return { deleteCommentMutation, updateCommentMutation };
};

export default useCommentHandler;
