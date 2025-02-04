'use client';

import { useEffect, useRef, useState } from 'react';

import { User } from '@supabase/supabase-js';

import ChatEmptyMessage from '@app/chat/_components/ChatEmptyMessage';
import ChatMessageList from '@app/chat/_components/ChatMessageList';

import useMessageList from '@hooks/chat/useMessgeList';
import useCheckMessageRead from '@hooks/chat/useCheckMessageRead';

import { MessageType } from '@queries/chat/getChatList';
import useSmallAlert from '@hooks/useSmallAlert';
import Loading from '@app/loading';

interface ChatRoomProps {
  user: User | null;
  chatRoomId: string;
}

const ChatRoom = ({ user, chatRoomId }: ChatRoomProps) => {
  const { messages, isPending, isError } = useMessageList(chatRoomId as string, user?.id as string);

  const currentUserId = user?.id;

  const chatRoomRef = useRef<HTMLDivElement | null>(null);

  const [summary, setSummary] = useState<string | null>(null);

  const { SmallAlert, openAlert } = useSmallAlert();

  useCheckMessageRead(chatRoomId as string, currentUserId as string);

  useEffect(() => {
    if (!messages?.length) return;

    chatRoomRef.current?.scrollTo({
      top: chatRoomRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const filterTodayMessages = (messages: MessageType[]) => {
    const today = new Date().toLocaleDateString();
    return messages.filter((message) => new Date(message.created_at).toLocaleDateString() === today);
  };

  const handleSummarize = () => {
    const todayMessages = filterTodayMessages(messages || []);

    if (todayMessages.length === 0) {
      openAlert();
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
          instructions:
            'Please summarize the conversation. If you cannot understand the conversation or summarization is not possible, respond with: "The conversation cannot be summarized. Please check the conversation content."',
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

  if (isPending) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  return (
    <div
      ref={chatRoomRef}
      className="flex w-full flex-col overflow-y-auto h-[calc(100dvh-48px)] pb-[58px] scroll-smooth scrollbar-hide"
    >
      {messages?.length === 0 && <ChatEmptyMessage />}
      <ChatMessageList messages={messages} currentUserId={currentUserId as string} />
      <SmallAlert>오늘의 대화가 없습니다.</SmallAlert>
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
