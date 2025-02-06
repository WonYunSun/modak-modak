'use client';

import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import NoChatList from '@app/chat/_components/NoChatList';
import ChatListItem from '@app/chat/_components/ChatListItem';

import SpinnerContainer from '@components/common/SpinnerContainer';
import FunnelHeader from '@components/common/FunnelHeader';

import useChatRoomList from '@hooks/chat/useChatRoomList';
import useUser from '@hooks/common/useUser';

const ChatRoomList = () => {
  const { user } = useUser();

  const { chatList, isPending, isError } = useChatRoomList(user?.id as string);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chatList', user?.id] });
  }, [user?.id]);

  if (isPending) return <SpinnerContainer height={110} />;
  if (isError) return <div>에러발생..</div>;

  return (
    <div className="h-dvh max-w-[600px] mx-auto border-x border-gray-200">
      <FunnelHeader label="채팅" />
      <main className="w-full h-full mt-2">
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
