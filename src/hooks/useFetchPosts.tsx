import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
    const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

  const { data, isPending, isError } = useQuery({
    queryKey: [groupId, 'posts'],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts`
      );
      const data = await res.json();
      return data;
    }
  });

  return { data, isPending, isError };
};
