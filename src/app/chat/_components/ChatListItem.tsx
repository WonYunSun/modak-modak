import Link from 'next/link';
import Image from 'next/image';

import React from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { getChatListType } from '@queries/chat/getChatList';

interface ChatListItemProps {
  chat: getChatListType;
}

dayjs.locale('ko');

const ChatListItem = ({ chat }: ChatListItemProps) => {
  return (
    <Link href={`chat/${chat.chat_room_id}`} key={chat.group_id} className="py-2">
      <div className="w-full flex gap-2 items-center">
        <Image
          src={chat.group_image_url}
          width={60}
          height={60}
          className="rounded-md w-[60px] h-[60px]"
          alt="group image"
        />
        <div className="w-full">
          <div className="w-full flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold leading-[140%] text-gray-900 max-w-[214px] h-auto">
              {chat.group_name}
            </h3>
            <h4 className="text-[10px] font-normal leading-[140%] text-gray-400">
              {chat.messages.length > 0
                ? dayjs(chat.messages[chat.messages.length - 1].created_at).format('A h:mm')
                : dayjs(new Date()).format('A h:mm')}
            </h4>
          </div>
          <div className="mt-1 w-full flex items-center justify-between">
            <p className="max-w-[209px] text-xs font-normal leading-[140%] text-gray-500">
              {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].message : '채팅을 시작해보세요.'}
            </p>
            {chat.unread_count > 0 ? <p>{chat.unread_count}</p> : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
