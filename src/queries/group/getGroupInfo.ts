'use server';

import { createClient } from '@utils/supabase/server';

import { GroupCardInfosType } from '@components/common/groupCard/GroupCard';

// 모임 불러오기
export const getGroupInfo = async (groupId: string): Promise<GroupCardInfosType> => {
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
    // TODO: is approved 인 유저 체크
    .single();

  if (error) throw new Error(`getGroupInfo 모임 정보 불러오는 중 에러 발생: ${error.message}`);

  const formattedData = {
    id: data.id,
    created_at: data.created_at,
    name: data.name,
    image_url: data.image_url,
    description: data.description,
    membersNum: data?.group_members?.[0]?.count ?? 0,
  };

  return formattedData;
};
