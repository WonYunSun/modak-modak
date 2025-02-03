import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

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
    enabled: !!user_id,
    staleTime: 1000 * 60 * 60,
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
              // 새 메시지가 속한 채팅방 찾기
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

              // 쿼리 캐시 업데이트
              queryClient.setQueryData(['chatList', user_id], updatedChatList);
            }
          }

          if (payload.eventType === 'UPDATE') {
            const currentChatList = queryClient.getQueryData(['chatList', user_id]) as getChatListType[];

            if (currentChatList) {
              const updatedChatList = currentChatList.map((chat) => {
                if (chat.chat_room_id === payload.new.chat_room_id) {
                  const isUnread = !payload.new.read_by?.includes(user_id); // 현재 사용자가 읽지 않은 메시지인지 확인
                  return {
                    ...chat,
                    messages: chat.messages.map((msg) => (msg.id === payload.new.id ? payload.new : msg)),
                    unread_count: isUnread ? chat.unread_count : Math.max(chat.unread_count - 1, 0), // 읽지 않은 메시지 수 업데이트
                  };
                }
                return chat;
              });

              queryClient.setQueryData(['chatList', user_id], updatedChatList);
            }
          }
        }
      )
      .subscribe((status, err) => {
        if (err) {
          console.error('Subscription error:', err);
        }
      });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user_id, queryClient, supabase]);

  return { chatList, isPending, isError };
};

export default useChatRoomList;
