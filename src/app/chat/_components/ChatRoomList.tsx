'use client';

import React from 'react';

import NoChatList from '@app/chat/_components/NoChatList';
import ChatListItem from '@app/chat/_components/ChatListItem';

import FunnelHeader from '@components/common/FunnelHeader';

import useChatRoomList from '@hooks/chat/useChatRoomList';
import useUser from '@hooks/useUser';

const ChatRoomList = () => {
  const { user } = useUser();
  const { chatList, isPending, isError } = useChatRoomList(user?.id as string);

  if (isPending) return <div>로딩 중..</div>;
  if (isError) return <div>에러발생..</div>;

  return (
    <div className="min-h-screen mx-5">
      <FunnelHeader label="채팅" />
      <main className="w-full h-full">
        {chatList?.length === 0 ? (
          <NoChatList />
        ) : (
          chatList?.map((chat) => <ChatListItem key={chat.group_id} chat={chat} />)
        )}
      </main>
    </div>
  );
};

export default ChatRoomList;
