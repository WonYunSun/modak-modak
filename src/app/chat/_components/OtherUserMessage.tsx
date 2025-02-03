'use client';

import Image from 'next/image';

import useChatOtherUser from '@hooks/chat/useChatOtherUser';

import { MessageType } from '@queries/chat/getChatList';

interface OtherUserMessageProps {
  message: MessageType;
  marginTop: string;
  isPreviousSameUser: boolean;
}

const OtherUserMessage = ({ message, marginTop, isPreviousSameUser }: OtherUserMessageProps) => {
  const { otherUser, isPending, isError } = useChatOtherUser(message.user_id);

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>로딩 중..</div>;
  }

  return (
    <div className={`flex justify-start px-3 ${marginTop}`}>
      <div className="flex gap-3">
        {isPreviousSameUser ? (
          <div className="w-9 h-9"></div>
        ) : (
          <Image
            src={otherUser?.profile_image ? otherUser?.profile_image : '/icons/profile-image.webp'}
            alt="other user"
            width={40}
            height={40}
            className="w-9 h-9 rounded-[50%] flex items-start "
          />
        )}
        <div className="flex flex-col gap-2">
          {!isPreviousSameUser && (
            <div className="text-xs font-normal leading-[140%] text-gray-900">{otherUser?.nickname}</div>
          )}

          <div className="flex gap-1">
            <div className="bg-[#FFF2EB] text-gray-900 max-w-[254px] px-3 py-2 text-sm font-normal leading-[140%] rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-none">
              {message.message}
            </div>
            <div className="flex flex-col justify-end items-start text-[10px] font-normal leading-[140%] text-gray-400">
              <span className="text-xs font-semibold leading-[140%] text-[#B94600]">
                {message.unread_count > 0 && message.unread_count}
              </span>
              {new Date(message.created_at).toLocaleTimeString('ko-KR', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserMessage;
