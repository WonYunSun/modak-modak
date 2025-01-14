import { useMutation, useQuery } from '@tanstack/react-query';

interface UseFetchGetPostProps {
  postId: string | string[];
}

interface UseFetchPostProps {
  postId: string | string[];
  text: string;
}

export const useFetchGetPost = ({ postId }: UseFetchGetPostProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [postId],
    queryFn: async () => {
      const res = await fetch(`/api/post?postId=${postId}`);
      const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};

export const useFetchPutPost = ({ postId, text }: UseFetchPostProps) => {
  const { mutate, data, isPending, isError, isSuccess } = useMutation({
    mutationKey: [postId],
    mutationFn: async ({ postId, text }: UseFetchPostProps) => {
      const res = await fetch(`/api/post`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId, text })
      });

      if (!res.ok) {
        throw new Error('게시글 수정에 실패했습니다.');
      }

      return res.json();
    }
  });

  return { mutate, data, isPending, isError, isSuccess };
};
