import { useQuery } from '@tanstack/react-query';

import getOtherUser from '@queries/chat/getOtherUser';

const useChatOtherUser = (userId: string) => {
  const {
    data: otherUser,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['otherUser', userId],
    queryFn: () => getOtherUser(userId),
  });

  return { otherUser, isPending, isError };
};

export default useChatOtherUser;
