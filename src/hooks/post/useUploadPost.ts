'use client';
import { uploadPost } from '@app/queries/post/uploadPost';
import { useMutation } from '@tanstack/react-query';

export const useUploadPost = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      content,
      scheduleId,
      groupId,
      files
    }: {
      userId: string;
      content: string;
      scheduleId: string;
      groupId: string;
      files: File[];
    }) => await uploadPost({ userId, content, scheduleId, groupId, files })
  });
};
