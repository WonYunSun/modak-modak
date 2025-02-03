'use client';

import ChatInput from '@app/chat/_components/ChatInput';
import ChatRoom from '@app/chat/_components/ChatRoom';

import FunnelHeader from '@components/common/FunnelHeader';

import useUser from '@hooks/useUser';

const ChatRoomDetail = () => {
  const { user } = useUser();

  return (
    <div className="relative w-full h-screen">
      <div className="px-5">
        <FunnelHeader label="채팅방" />
      </div>
      <ChatRoom user={user} />
      <ChatInput user={user} />
    </div>
  );
};

export default ChatRoomDetail;
