'use client';

import { useParams } from 'next/navigation';

import React, { useEffect, useRef, useState } from 'react';

import { User } from '@supabase/supabase-js';

import DateSeparator from '@app/chat/_components/DateSeparator';
import UserMessage from '@app/chat/_components/UserMessage';
import OtherUserMessage from '@app/chat/_components/OtherUserMessage';

import useMessageList from '@hooks/chat/useMessgeList';
import useCheckMessageRead from '@hooks/chat/useCheckMessageRead';

import { MessageType } from '@queries/chat/getChatList';

interface ChatRoomProps {
  user: User | null;
}

const ChatRoom = ({ user }: ChatRoomProps) => {
  const { id: chatRoomId } = useParams();
  const { messages, isPending, isError } = useMessageList(chatRoomId as string, user?.id as string);
  const currentUserId = user?.id;
  const chatRoomRef = useRef<HTMLDivElement | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  useCheckMessageRead(chatRoomId as string, currentUserId as string);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [messages]);

  const isNewDate = (current: string, previous: string | null) => {
    if (!previous) return true;

    const currentDate = new Date(current).toLocaleDateString();
    const previousDate = new Date(previous).toLocaleDateString();
    return currentDate !== previousDate;
  };

  const filterTodayMessages = (messages: MessageType[]) => {
    const today = new Date().toLocaleDateString();
    return messages.filter((message) => new Date(message.created_at).toLocaleDateString() === today);
  };

  const handleSummarize = () => {
    const todayMessages = filterTodayMessages(messages || []);

    if (todayMessages.length === 0) {
      alert('오늘의 대화가 없습니다.');
      return;
    }

    const ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01', [
      'realtime',
      `openai-insecure-api-key.${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
      'openai-beta.realtime-v1',
    ]);

    ws.addEventListener('open', () => {
      console.log('GPT API 리얼타임 연결');

      const createResponseEvent = {
        type: 'response.create',
        response: {
          modalities: ['text'],
          instructions: 'Please summarize the conversation.',
        },
      };

      ws.send(JSON.stringify(createResponseEvent));

      const createConversationEvent = {
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: todayMessages.map((msg) => msg.message).join(' '),
            },
          ],
        },
      };

      ws.send(JSON.stringify(createConversationEvent));
    });

    ws.addEventListener('message', (data) => {
      const message = JSON.parse(data.data);
      console.log(message.type);
      switch (message.type) {
        case 'response.text.delta':
          setSummary((prev) => (prev || '') + message.delta);
          break;
        case 'response.text.done':
          console.log('전체 답변:', message.text);
          break;
        case 'response.done':
          ws.close();
          break;
      }
    });

    ws.addEventListener('error', (error) => {
      console.error('웹소켓 에러', error);
    });

    ws.addEventListener('close', () => {
      console.log('GPT API 리얼타임 연결 종료');
    });
  };

  if (isPending) return <div>로딩</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div ref={chatRoomRef} className="flex w-full flex-col overflow-y-auto h-[calc(100vh-48px-58px)] scroll-smooth">
      <div className="bg-gray-100 px-5 py-4">
        <p className="text-xs font-bold leading-[140%] text-gray-900">소중한 사람들과 이야기 나눠보세요</p>
        <p className="text-xs font-semibold leading-[140%] text-gray-900">
          미뤄왔던 만남에 대한 이야기 나눠 보시는 건 어떨까요?
        </p>
      </div>
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
      <div>
        <button
          onClick={handleSummarize}
          className="bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          AI 요약하기
        </button>
        {summary && (
          <div className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <p className="font-bold">AI 요약 결과</p>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
