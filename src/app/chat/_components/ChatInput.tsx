'use client';

import { useRef } from 'react';

import { User } from '@supabase/supabase-js';

import Button from '@components/common/Button';

import useChatMessage from '@hooks/chat/useChatMessage';
import useIOSKeyboardHeight from '@hooks/comment/useIOSKeyboardHeight';

interface ChatInputProps {
  user: User | null;
  chatRoomId: string;
}

const ChatInput = ({ user, chatRoomId }: ChatInputProps) => {
  const { message, setMessage, sendMessage } = useChatMessage(chatRoomId as string, user?.id as string);

  const keyboardHeight = useIOSKeyboardHeight();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      const maxHeight = 100;

      if (textAreaRef.current.scrollHeight > maxHeight) {
        textAreaRef.current.style.height = `${maxHeight}px`;
        textAreaRef.current.style.overflow = 'auto';
      } else {
        textAreaRef.current.style.overflow = 'hidden';
      }
    }
  };

  const resetTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(resetTextAreaHeight);
    }
  };

  return (
    <div
      className={`px-5 pt-2 ${keyboardHeight > 0 ? `pb-[${keyboardHeight}px]` : 'pb-2'} absolute bottom-0 left-0 right-0 transition-all`}
    >
      <div className="w-full border bg-white px-3 py-2 rounded-lg flex items-center gap-1">
        <textarea
          rows={1}
          ref={textAreaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="메세지 입력하기.."
          className="resize-none border-none outline-none min-h-6 h-6 text-sm w-full"
        />
        <Button
          type="button"
          label="보내기"
          className="w-12 text-sm font-semibold leading-[140%]"
          onClick={() => sendMessage(resetTextAreaHeight)}
        />
      </div>
    </div>
  );
};

export default ChatInput;
