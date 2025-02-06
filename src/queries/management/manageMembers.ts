'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType, UsersType } from '@ts/supabaseTableRowTypes';

interface ManageWatingUserParams {
  groupId: GroupsType['id'];
  waitingUserId: UsersType['id'];
}
export const permitNewMember = async ({ groupId, waitingUserId }: ManageWatingUserParams) => {
  try {
    const supabase = await createClient();

    await supabase
      .from('group_members')
      .update({ is_approved: true })
      .eq('group_id', groupId)
      .eq('user_id', waitingUserId);

    // 승인 후 채팅방 멤버에도 추가하기
    const { data: chatRoomData, error: chatRoomError } = await supabase
      .from('chat_rooms')
      .select('id')
      .eq('group_id', groupId)
      .single();

    if (chatRoomError) {
      throw new Error('채팅방 정보를 가져오는 중 에러가 발생했습니다.');
    }

    const { error: chatMemberError } = await supabase
      .from('chat_room_members')
      .insert({ chat_room_id: chatRoomData?.id, user_id: waitingUserId, group_id: groupId });

    if (chatMemberError) {
      throw new Error('모임 채팅방 가입 중 에러가 발생했습니다.');
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface DeleteMemberParams extends Omit<ManageWatingUserParams, 'waitingUserId'> {
  memberId: UsersType['id'];
}
export const deleteMember = async ({ groupId, memberId }: DeleteMemberParams) => {
  try {
    const supabase = await createClient();

    await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', memberId);

    // 모임 탈퇴시 채팅방 멤버에서도 삭제
    await supabase.from('chat_room_members').delete().eq('group_id', groupId).eq('user_id', memberId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
