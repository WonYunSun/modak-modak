'use client';

import { useParams } from 'next/navigation';

import ChatInput from '@app/chat/_components/ChatInput';
import ChatRoom from '@app/chat/_components/ChatRoom';

import FunnelHeader from '@components/common/FunnelHeader';

import useGroupName from '@hooks/chat/useGroupName';
import useUser from '@hooks/useUser';

const ChatRoomDetail = () => {
  const { user } = useUser();

  const { id: chatRoomId } = useParams();

  const { chatGroupName } = useGroupName(chatRoomId as string);

  return (
    <div className="relative max-w-[600px] mx-auto border-x border-gray-200 w-full h-screen">
      <FunnelHeader label={chatGroupName?.name as string} />
      <ChatRoom user={user} chatRoomId={chatRoomId as string} />
      <ChatInput user={user} chatRoomId={chatRoomId as string} />
    </div>
  );
};

export default ChatRoomDetail;
