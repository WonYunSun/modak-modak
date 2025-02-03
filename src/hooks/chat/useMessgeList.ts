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
  });

  useEffect(() => {
    const subscription = supabase
      .channel(`chat_room_${chatRoomId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, async (payload) => {
        console.log('채팅방 이벤트', payload);
        if (payload.eventType === 'INSERT') {
          console.log('채팅방 이벤트 메세지 삽입 이벤트');
          const currentMessages = queryClient.getQueryData(['messageList', chatRoomId]) as MessageType[];
          console.log('채팅방 삽입 이벤트 currentMessages', currentMessages);
          if (currentMessages && chatRoomId === payload.new.chat_room_id) {
            queryClient.setQueryData(['messageList', chatRoomId], [...currentMessages, payload.new]);
            console.log('삽입 이벤트 후 messages', messages);
          }
          // // queryClient.invalidateQueries(['chatList', userId]);
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
          // // queryClient.invalidateQueries(['chatList', userId]);
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
