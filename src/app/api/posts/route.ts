import { NextResponse } from 'next/server';
import { createClient } from '@utils/supabase/server';

export const GET = async () => {
  try {
    const supabase = await createClient();
    const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

    // groupId로 posts, groups 테이블 각각 조회
    const [postsResult, groupsResult] = await Promise.all([
      supabase.from('posts').select('*').eq('group_id', groupId),
      supabase.from('groups').select('*').eq('id', groupId)
    ]);

    const { data: postsData, error: postsError } = postsResult;
    const { data: groupsData, error: groupsError } = groupsResult;

    if (postsError) {
      return NextResponse.json({ error: postsError.message }, { status: 500 });
    }

    if (groupsError) {
      return NextResponse.json({ error: groupsError.message }, { status: 500 });
    }

    return NextResponse.json({ posts: postsData, groups: groupsData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `api posts server error: ${error}` }, { status: 500 });
  }
};
