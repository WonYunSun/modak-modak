import { useEffect } from 'react';

import { createClient } from '@utils/supabase/client';

import getMessageRead from '@queries/chat/getMessageRead';

const useCheckMessageRead = (chatRoomId: string, userId: string) => {
  const supabase = createClient();

  const markMessagesAsRead = async () => {
    try {
      const unreadMessages = await getMessageRead(chatRoomId, userId);

      console.log('unreadMessages', unreadMessages);

      if (unreadMessages && unreadMessages.length > 0) {
        for (const message of unreadMessages) {
          // 이미 읽은 메시지는 업데이트하지 않음
          if (message.read_by!.includes(userId)) continue;

          const unreadCount = message.unread_count - 1;
          const { error } = await supabase
            .from('messages')
            .update({ read_by: [...message.read_by!, userId], unread_count: unreadCount })
            .eq('id', message.id);

          if (error) {
            throw new Error('메세지 읽음 처리 업데이트 중 에러가 발생했습니다.');
          }
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    if (chatRoomId && userId) {
      markMessagesAsRead();
    }
  }, [chatRoomId, userId]);
};

export default useCheckMessageRead;
