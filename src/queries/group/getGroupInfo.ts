'use server';

import { createClient } from '@utils/supabase/server';

import { GroupCardInfosType } from '@components/common/groupCard/GroupCard';

// 모임 카드 정보 불러오기
export const getGroupInfo = async (groupId: string): Promise<GroupCardInfosType> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('groups')
      .select(
        `
      id, 
      created_at,
      name, 
      image_url,
      description, 
      group_members(count)
    `
      )
      .eq('id', groupId)
      .filter('group_members.is_approved', 'eq', true) // is_approved 조건 추가
      .single();

    if (error) {
      throw new Error(`getGroupInfo 모임 정보 불러오는 중 에러 발생: ${error.message}`);
    }

    const formattedData = {
      id: data.id,
      created_at: data.created_at,
      name: data.name,
      image_url: data.image_url,
      description: data.description,
      membersNum: data?.group_members?.[0]?.count ?? 0,
    };

    return formattedData;
  } catch (err) {
    console.error(err);
    throw new Error(`getGroupInfo 함수 실행 중 에러 발생: ${(err as Error).message}`);
  }
};
