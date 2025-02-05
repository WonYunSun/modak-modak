import { useQuery } from '@tanstack/react-query';
import { getPhotos } from 'queries/photo/getPhotos';

export const useFetchPhotos = (groupId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['photos', groupId],
    queryFn: () => getPhotos(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 60,
  });
  return { data, isPending, isError };
};
