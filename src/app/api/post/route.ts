import { createClient } from '@utils/supabase/server';
import { NextResponse } from 'next/server';

// ✅ 게시글 불러오기
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        content,
        schedules!inner(
          name,
          memo,
          created_at,
          start_date,
          end_date,
          start_time
          )
      `
      )
      .eq('id', postId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `api GET post server error: ${error}` }, { status: 500 });
  }
}

// // ✅ 게시글 등록하기
// export async function POST(request: Request) {
//   try {
//     const supabase = await createClient();
//     const body = await request.json();

//     const { content, group_id, schedule_id, user_id } = body;

//     const { data, error } = await supabase
//       .from('posts')
//       .insert([{ content, group_id, schedule_id, user_id }]);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ message: '게시글이 성공적으로 작성되었습니다.', data }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: `api POST post server error: ${error}` }, { status: 500 });
//   }
// }

// ✅ 게시글 수정하기
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, text } = body;

    const { data, error } = await supabase
      .from('posts')
      .update({ text })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '게시글 수정 완료', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `api PUT posts server error: ${error}` }, { status: 500 });
  }
}

// // ✅ 게시글 삭제하기
// export async function DELETE(request: Request) {
//   try {
//     const supabase = await createClient();
//     const { id } = await request.json();

//     const { error } = await supabase
//       .from('posts')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ message: '게시글 삭제 완료' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: `api DELETE posts server error: ${error}` }, { status: 500 });
//   }
// }
