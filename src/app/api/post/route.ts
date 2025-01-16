import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    // FormData를 파싱
    const formData = await req.formData();

    const userId = formData.get('userId') as string;
    const content = formData.get('content') as string | null;
    const scheduleId = formData.get('scheduleId') as string;
    const groupId = formData.get('groupId') as string;
    const files = formData.getAll('files') as File[];

    // 필수 데이터 검증
    if (!userId || !scheduleId || !groupId || files.length === 0) {
      return NextResponse.json({ success: false, message: '필수 데이터가 누락되었습니다.' }, { status: 400 });
    }

    // 게시글 데이터 추가 (posts 테이블)
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content: content,
        schedule_id: scheduleId,
        group_id: groupId,
      })
      .select('id')
      .single();

    if (postError || !postData) {
      console.error('게시글 등록 오류:', postError);
      return NextResponse.json({ success: false, message: '게시글 등록 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 파일 Storage 업로드
    const uploadedFileUrls: string[] = await Promise.all(
      files.map(async (file) => {
        const fileExt = file.name.split('.').pop(); // 파일 확장자
        const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`; // 파일 고유 이름
        // 이미지 파일 버킷 내 저장 위치
        const filePath = `${groupId}/${uniqueFileName}`;
        const { error: uploadError } = await supabase.storage.from('post-photos').upload(filePath, file);

        if (uploadError) {
          console.error('파일 버킷 업로드 오류:', uploadError);
          throw new Error('파일 업로드 중 오류가 발생했습니다.');
        }

        return filePath;
      })
    );

    // 이미지 URL을 post_images 테이블에 저장
    const insertImagePromises = uploadedFileUrls.map((url) =>
      supabase.from('post_images').insert({
        post_id: postData.id,
        image_url: url,
      })
    );

    const imageResults = await Promise.all(insertImagePromises);
    const imageErrors = imageResults.find((res) => res.error);

    if (imageErrors) {
      console.error('이미지 테이블 저장 오류:', imageErrors.error);
      return NextResponse.json(
        { success: false, message: '이미지 데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('uploadPost: 게시글 업로드 실패:', error);
    return NextResponse.json({ success: false, message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
