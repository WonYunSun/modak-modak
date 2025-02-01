import { Database } from '@ts/supabase';
import { createClient } from '@utils/supabase/client';

const supabase = createClient();

type MessageType = Database['public']['Tables']['messages']['Row'];

export interface getChatListType {
  group_name: string;
  group_image_url: string;
  group_id: string;
  current_user: string;
  chat_room_id: string;
  messages: MessageType[];
  unread_count: number;
}

const getChatList = async (userId: string): Promise<getChatListType[] | []> => {
  try {
    // 그룹 데이터 가져오기
    const { data: groups, error: groupError } = await supabase
      .from('group_members')
      .select('*, groups(id, name, image_url)')
      .eq('user_id', userId)
      .eq('is_approved', true);

    if (groupError) {
      throw new Error('유저 채팅 목록을 가져오는데 실패했습니다.');
    }

    // 채팅방 데이터 가져오기
    const { data: chatGroups, error: chatGroupsError } = await supabase
      .from('chat_room_members')
      .select('*')
      .eq('user_id', userId);

    if (chatGroupsError) {
      throw new Error('유저 채팅 목록을 가져오는데 실패했습니다.');
    }

    // 메세지 데이터 가져오기
    const { data: messages, error: messagesError } = await supabase.from('messages').select('*');

    if (messagesError) {
      throw new Error('채팅 대화를 가져오는데 실패했습니다.');
    }

    console.log('groups', groups);
    console.log('chatGroups', chatGroups);
    console.log('messages', messages);

    // groups와 chatGroups 데이터를 합쳐 하나의 객체로 만들기
    const combinedList = groups.map((group) => {
      // 해당 그룹에 대응하는 채팅방 찾기
      const matchingChatGroup = chatGroups.find((chatGroup) => chatGroup.group_id === group.group_id);
      const messagesGroup = messages.filter((message) => message.chat_room_id === matchingChatGroup.chat_room_id);

      const unreadCount = messagesGroup.filter(
        (message) => !message.read_by?.includes(userId) // 현재 사용자가 읽지 않은 메시지
      ).length;

      return {
        group_name: group.groups.name,
        group_image_url: group.groups.image_url,
        group_id: group.group_id,
        current_user: group.user_id,
        chat_room_id: matchingChatGroup.chat_room_id,
        messages: messagesGroup,
        unread_count: unreadCount,
      };
    });

    return combinedList || [];
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export default getChatList;
