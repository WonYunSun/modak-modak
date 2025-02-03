import { MessageType } from '@queries/chat/getChatList';

import { createClient } from '@utils/supabase/client';

type UnReadMessageType = Omit<MessageType, 'created_at' | 'message' | 'user_id' | 'chat_room_id'>;

const getMessageRead = async (chatRoomId: string, userId: string): Promise<UnReadMessageType[] | []> => {
  const supabase = createClient();

  const { data, error: unreadMessageError } = await supabase
    .from('messages')
    .select('id, read_by, unread_count')
    .eq('chat_room_id', chatRoomId)
    .not('read_by', 'cs', `{${userId}}`); // read_by 배열에 userId가 없는 메시지 조회

  if (unreadMessageError) {
    throw new Error('읽지 않은 메세지를 찾는 중 에러가 발생했습니다.');
  }

  return data;
};

export default getMessageRead;
