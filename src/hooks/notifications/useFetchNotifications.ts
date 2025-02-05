'use client';

import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/common/useUser';
import { fetchNotifications } from '@queries/notifications/fetchNotifications';

const useFetchNotifications = () => {
  const { user, isError: userError } = useUser();
  const userId = user ? user.id : null;

  if (userError) throw new Error(`user error : ${userError ? userError : 'user is null'}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ['fetchNotifications', userId],
    queryFn: async () => fetchNotifications({ userId: userId! }),
    enabled: !!userId,
  });

  return { data, isPending, isError };
};

export default useFetchNotifications;
