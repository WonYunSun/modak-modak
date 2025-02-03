import { useState } from 'react';

import useChatRoomPresence from '@hooks/chat/useChatRoomPresence';

import { insertMessage } from '@queries/chat/chatInputQuery';

const useChatMessage = (chatRoomId: string, userId: string) => {
  const [message, setMessage] = useState<string>('');
  const onlineUsers = useChatRoomPresence(chatRoomId, userId);

  const sendMessage = async (resetTextAreaHeight: () => void) => {
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    try {
      await insertMessage(chatRoomId, userId, message, onlineUsers);
      setMessage('');
      resetTextAreaHeight();
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  };

  return { message, setMessage, sendMessage };
};

export default useChatMessage;
