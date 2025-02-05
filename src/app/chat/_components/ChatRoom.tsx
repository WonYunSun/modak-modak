'use client';

import { useEffect, useRef } from 'react';

import { User } from '@supabase/supabase-js';

import Loading from '@app/loading';

import ChatEmptyMessage from '@app/chat/_components/ChatEmptyMessage';
import ChatMessageList from '@app/chat/_components/ChatMessageList';
import ChatAISummary from '@app/chat/_components/ChatAISummary';

import useMessageList from '@hooks/chat/useMessgeList';
import useCheckMessageRead from '@hooks/chat/useCheckMessageRead';

interface ChatRoomProps {
  user: User | null;
  chatRoomId: string;
}

const ChatRoom = ({ user, chatRoomId }: ChatRoomProps) => {
  const { messages, isPending, isError } = useMessageList(chatRoomId as string, user?.id as string);

  const currentUserId = user?.id;

  const chatRoomRef = useRef<HTMLDivElement | null>(null);

  useCheckMessageRead(chatRoomId as string, currentUserId as string);

  useEffect(() => {
    if (!messages?.length) return;

    chatRoomRef.current?.scrollTo({
      top: chatRoomRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  if (isPending) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  return (
    <div
      ref={chatRoomRef}
      className="flex w-full flex-col overflow-y-auto h-[calc(100dvh-48px)] pb-[58px] scroll-smooth scrollbar-hide"
    >
      {messages?.length === 0 && <ChatEmptyMessage />}
      <ChatMessageList messages={messages} currentUserId={currentUserId as string} />
      <ChatAISummary messages={messages || []} />
    </div>
  );
};

export default ChatRoom;
