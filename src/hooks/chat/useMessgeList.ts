import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { MessageType } from '@queries/chat/getChatList';
import getMessageList from '@queries/chat/getMessgeList';

import { createClient } from '@utils/supabase/client';

const useMessageList = (chatRoomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: messages,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['messageList', chatRoomId],
    queryFn: () => getMessageList(chatRoomId),
    enabled: !!chatRoomId,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const subscription = supabase
      .channel(`chat_room_${chatRoomId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, async (payload) => {
        if (payload.eventType === 'INSERT') {
          const currentMessages = queryClient.getQueryData(['messageList', chatRoomId]) as MessageType[];
          if (currentMessages && chatRoomId === payload.new.chat_room_id) {
            queryClient.setQueryData(['messageList', chatRoomId], [...currentMessages, payload.new]);
          }
          queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
        }

        if (payload.eventType === 'UPDATE') {
          const currentMessages = queryClient.getQueryData(['messageList', chatRoomId]) as MessageType[];
          if (currentMessages) {
            const updatedMessages = currentMessages.map((message) =>
              message.id === payload.new.id ? payload.new : message
            );
            queryClient.setQueryData(['messageList', chatRoomId], updatedMessages);
          }
          queryClient.invalidateQueries({ queryKey: ['chatList', userId] });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatRoomId, queryClient, supabase, userId]);

  return { messages, isPending, isError };
};

export default useMessageList;
