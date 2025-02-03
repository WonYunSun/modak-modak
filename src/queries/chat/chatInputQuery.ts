import { createClient } from '@utils/supabase/client';

const supabase = createClient();

// 채팅방 총 유저의 수를 가져오는 쿼리
export const getChatRoomUserCount = async (chatRoomId: string): Promise<number> => {
  try {
    const { data: chatRoomUsers, error: chatRoomUsersError } = await supabase
      .from('chat_room_members')
      .select('user_id')
      .eq('chat_room_id', chatRoomId);

    if (chatRoomUsersError) {
      throw new Error('채팅방 인원수를 가져오는데 실패했습니다.');
    }

    return chatRoomUsers ? chatRoomUsers.length : 0;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

// messages 테이블에 메세지 삽입하는 쿼리
export const insertMessage = async (chatRoomId: string, userId: string, message: string, onlineUsers: string[]) => {
  try {
    const totalChatUsers = await getChatRoomUserCount(chatRoomId);

    const unreadCount = totalChatUsers - onlineUsers.length;

    const { error: chatInsertError } = await supabase.from('messages').insert({
      chat_room_id: chatRoomId,
      user_id: userId,
      message,
      unread_count: unreadCount,
      read_by: [...onlineUsers], // 메시지를 보낸 사람은 읽은 것으로 처리
    });

    if (chatInsertError) {
      throw new Error('메세지 작성을 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
