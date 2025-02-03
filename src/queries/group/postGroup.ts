'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType } from '@ts/supabaseTableRowTypes';

export const addGroup = async (groupData: GroupsType, userId?: string): Promise<string> => {
  try {
    const supabase = await createClient();

    const { data: groupInsertData, error: groupInsertError } = await supabase
      .from('groups')
      .insert([
        {
          created_at: groupData.created_at,
          description: groupData.description,
          image_url: groupData.image_url,
          name: groupData.name,
        },
      ])
      .select();

    if (groupInsertError || !groupInsertData || groupInsertData.length === 0) {
      throw new Error('모임 생성에 실패했습니다.');
    }

    const groupResultData = groupInsertData[0];

    // 채팅방 만들기
    const { data: chatRoomInsertData, error: chatRoomInsertError } = await supabase
      .from('chat_rooms')
      .insert([
        {
          group_id: groupResultData.id,
          name: groupResultData.name,
          image_url: groupResultData.image_url,
        },
      ])
      .select();

    if (chatRoomInsertError) {
      throw new Error('채팅방 생성 중 에러가 발생했습니다.');
    }

    const chatRoomResultData = chatRoomInsertData[0];

    const { error: memberInsertError } = await supabase.from('group_members').insert({
      group_id: groupResultData.id,
      user_id: userId,
      is_leader: true,
      is_approved: true,
    });

    if (memberInsertError) {
      throw new Error('그룹 멤버 추가에 실패했습니다.');
    }


    // 채팅방 멤버 추가
    const { error: chatRoomMemberInsertError } = await supabase.from('chat_room_members').insert({
      chat_room_id: chatRoomResultData.id,
      user_id: userId,
      group_id: groupResultData.id,
    });

    if (chatRoomMemberInsertError) {
      throw new Error('채팅방 멤버 추가중 에러가 발생했습니다.');
    }

    return groupResultData.id;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
