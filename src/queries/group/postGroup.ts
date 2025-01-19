'use server';

import { GroupsType } from '@ts/supabaseTableRowTypes';
import { createClient } from '@utils/supabase/server';

export const addGroup = async (groupData: GroupsType, userId?: string): Promise<void> => {
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

    const groupId = groupInsertData[0].id;

    const { error: memberInsertError } = await supabase.from('group_members').insert({
      group_id: groupId,
      user_id: userId,
      is_leader: true,
      is_approved: true,
    });

    if (memberInsertError) {
      throw new Error('그룹 멤버 추가에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
