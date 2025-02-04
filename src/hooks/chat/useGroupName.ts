import { useQuery } from '@tanstack/react-query';

import getGroupName from '@queries/chat/getGroupName';

const useGroupName = (chatRoomId: string) => {
  const {
    data: chatGroupName,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['groupName', chatRoomId],
    queryFn: () => getGroupName(chatRoomId),
    enabled: !!chatRoomId,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { chatGroupName, isPending, isError };
};

export default useGroupName;
