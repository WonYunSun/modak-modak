'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUploadPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData,
      });

      const groupId = formData.get('groupId') as string;

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'useUploadPost: 게시글 업로드 실패');
      }

      return { groupId, ...(await response.json()) };
    },
    onSuccess: (data) => {
      const { groupId } = data;
      queryClient.invalidateQueries({ queryKey: [groupId, 'posts'] });
      console.log('업로드 성공');
    },
    onError: (error: Error) => {
      console.error('useUploadPost: 업로드 실패:', error.message);
    },
  });
};

export default useUploadPost;
