import { useQuery } from '@tanstack/react-query';
import { getPhotos } from 'queries/photo/getPhotos';

export const useFetchPhotos = (groupId: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [groupId, 'photos'],
    queryFn: () => getPhotos(groupId),
  });
  return { data, isPending, isError };
};
