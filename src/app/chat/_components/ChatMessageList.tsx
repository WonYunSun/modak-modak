import React from 'react';

import DateSeparator from '@app/chat/_components/DateSeparator';
import OtherUserMessage from '@app/chat/_components/OtherUserMessage';
import UserMessage from '@app/chat/_components/UserMessage';

import { MessageType } from '@queries/chat/getChatList';

interface ChatMessageListProps {
  messages: MessageType[] | [] | undefined;
  currentUserId: string;
}

const ChatMessageList = ({ messages, currentUserId }: ChatMessageListProps) => {
  const isNewDate = (current: string, previous: string | null) => {
    if (!previous) return true;

    const currentDate = new Date(current).toLocaleDateString();
    const previousDate = new Date(previous).toLocaleDateString();
    return currentDate !== previousDate;
  };

  return (
    <div className="flex-1">
      {messages?.map((message, index) => {
        const isCurrentUser = message.user_id === currentUserId;
        const isPreviousSameUser = index > 0 && messages[index - 1].user_id === message.user_id;
        const marginTop = isPreviousSameUser ? 'mt-1' : 'mt-4';

        const showDateSeparator = isNewDate(message.created_at, index > 0 ? messages[index - 1].created_at : null);

        return (
          <React.Fragment key={message.id}>
            {showDateSeparator && <DateSeparator key={message.created_at} date={message.created_at} />}
            {isCurrentUser ? (
              <UserMessage message={message} marginTop={marginTop} />
            ) : (
              <OtherUserMessage message={message} marginTop={marginTop} isPreviousSameUser={isPreviousSameUser} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
