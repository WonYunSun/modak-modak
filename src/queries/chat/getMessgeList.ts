import { MessageType } from '@queries/chat/getChatList';

import { createClient } from '@utils/supabase/client';

const getMessageList = async (chatRoomId: string): Promise<MessageType[] | []> => {
  const supabase = createClient();

  const { data, error: messageListError } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_room_id', chatRoomId)
    .order('created_at', { ascending: true });

  if (messageListError) {
    throw new Error('유저 채팅 목록을 가져오는데 실패했습니다.');
  }

  return data;
};

export default getMessageList;
