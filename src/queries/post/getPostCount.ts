'use server';

import { createClient } from '@utils/supabase/server';

// 전체 게시글 개수 가져오기
export const getPostCount = async (groupId: string, searchTerm?: string): Promise<number> => {
  const supabase = await createClient();

  let query = supabase.from('posts').select('id, schedules!inner(name)').eq('group_id', groupId);

  // 검색 시
  if (searchTerm) {
    query = query.ilike('schedules.name', `%${searchTerm}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(`getPostCount: 게시글 개수 불러오기 중 에러 발생: ${error.message}`);

  return data?.length ?? 0;
};
