import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteComment from '@queries/group/comments/deleteComment';
import updateComment from '@queries/group/comments/updateComment';

import { CommentsType } from '@queries/group/comments/fetchComments';

const useCommentHandler = (commentId: string, postId: string, groupId: string) => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['posts', groupId, ''] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: (newContent: string) => updateComment(newContent, commentId),
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
    },
  });

  return { deleteCommentMutation, updateCommentMutation };
};

export default useCommentHandler;
