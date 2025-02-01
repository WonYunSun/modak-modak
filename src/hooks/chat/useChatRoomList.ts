import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createClient } from '@utils/supabase/client';
import getChatList, { getChatListType } from '@queries/chat/getChatList';

const useChatRoomList = (user_id: string) => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const {
    data: chatList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['chatList', user_id],
    queryFn: () => getChatList(user_id),
  });

  useEffect(() => {
    const subscription = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          // 새 메시지가 생성되었을 때
          if (payload.eventType === 'INSERT') {
            const currentChatList = queryClient.getQueryData(['chatList', user_id]) as getChatListType[];

            if (currentChatList) {
              const updatedChatList = currentChatList.map((chat) => {
                if (chat.chat_room_id === payload.new.chat_room_id) {
                  const isUnread = !payload.new.read_by?.includes(user_id);
                  return {
                    ...chat,
                    messages: [...chat.messages, payload.new],
                    unread_count: isUnread ? chat.unread_count + 1 : chat.unread_count,
                  };
                }
                return chat;
              });

              queryClient.setQueryData(['chatList', user_id], updatedChatList);
            }
          }

          // 메세지가 업데이트 되었을 때
          if (payload.eventType === 'UPDATE') {
            const currentChatList = queryClient.getQueryData(['chatList', user_id]) as getChatListType[];

            if (currentChatList) {
              const updatedChatList = currentChatList.map((chat) => {
                if (chat.chat_room_id === payload.new.chat_room_id) {
                  const isUnread = !payload.new.read_by?.includes(user_id); // 현재 사용자가 읽지 않은 메시지인지 확인
                  return {
                    ...chat,
                    messages: chat.messages.map((msg) => (msg.id === payload.new.id ? payload.new : msg)),
                    unread_count: isUnread ? chat.unread_count : chat.unread_count - 1,
                  };
                }
                return chat;
              });

              queryClient.setQueryData(['chatList', user_id], updatedChatList);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user_id, queryClient, supabase]);

  return { chatList, isPending, isError };
};

export default useChatRoomList;
