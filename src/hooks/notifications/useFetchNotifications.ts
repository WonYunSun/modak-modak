'use client';

import useUser from '@hooks/useUser';
import { fetchNotifications } from '@queries/notifications/fetchNotifications';
import { useQuery } from '@tanstack/react-query';

const useFetchNotifications = () => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError ? userError : 'user is null'}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchNotifications', userId],
    queryFn: async () => {
      if (userId) return fetchNotifications({ userId });
    },
  });

  return { data, isPending, isError };
};

export default useFetchNotifications;
