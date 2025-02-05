import { useState } from 'react';

import useChatRoomPresence from '@hooks/chat/useChatRoomPresence';

import { insertMessage } from '@queries/chat/chatInputQuery';
import useSmallAlert from '@hooks/common/useSmallAlert';

const useChatMessage = (chatRoomId: string, userId: string) => {
  const [message, setMessage] = useState<string>('');

  const onlineUsers = useChatRoomPresence(chatRoomId, userId);

  const { SmallAlert, openAlert } = useSmallAlert();

  const sendMessage = async (resetTextAreaHeight: () => void) => {
    if (!message.trim()) {
      openAlert();
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

  return { message, setMessage, sendMessage, SmallAlert };
};

export default useChatMessage;
