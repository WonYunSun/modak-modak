import { createClient } from '@utils/supabase/server';
import { NextResponse } from 'next/server';

// ✅ 게시글 리스트 불러오기
export async function GET() {
  try {
    const supabase = await createClient();
    const groupId = '52f44a96-b8f7-4c6c-80b1-d657eafd3821';

    // group_id 로 posts, users, schedules 테이블 한꺼번에 조회
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id, 
        content,
        users!inner(nickname, profile_image),
        schedules!inner(name, memo, start_date, end_date, start_time),
        comments(count)    `
      )
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `api GET posts server error: ${error}` }, { status: 500 });
  }
}
