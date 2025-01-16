'use server';

import { createClient } from '@utils/supabase/server';

export const uploadPost = async (formData: FormData): Promise<{ success: boolean }> => {
  const supabase = await createClient();

  try {
    const userId = formData.get('userId') as string;
    const content = formData.get('content') as string | null;
    const scheduleId = formData.get('scheduleId') as string;
    const groupId = formData.get('groupId') as string;
    const files = formData.getAll('files') as File[];

    if (!userId || !scheduleId || !groupId || files.length === 0) {
      throw new Error('uploadPost: 필수 데이터가 입력되지 않았습니다.');
    }

    // 게시글 데이터 추가 (posts 테이블)
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content: content || null,
        schedule_id: scheduleId,
        group_id: groupId,
      })
      .select('id')
      .single();

    if (postError || !postData) throw new Error('uploadPost: 게시글 등록 중 오류 발생');

    // 파일 Storage 업로드
    const uploadedFileUrls: string[] = await Promise.all(
      files.map(async (file) => {
        const fileExt = file.name.split('.').pop(); // 파일 확장자
        const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`; // 파일 고유 이름
        const filePath = `posts/${groupId}/${uniqueFileName}`; // 이미지 파일 버킷 내 저장 위치

        const { error: uploadError } = await supabase.storage.from('post-photos').upload(filePath, file);

        if (uploadError) throw new Error('uploadPost: 이미지 파일 버킷 업로드 중 오류 발생');

        return filePath;
      })
    );

    // ✅ 이미지 URL을 post_images 테이블에 저장
    const insertImagePromises = uploadedFileUrls.map((url) =>
      supabase.from('post_images').insert({
        post_id: postData.id,
        image_url: url,
      })
    );
    const imageResults = await Promise.all(insertImagePromises);
    const imageErrors = imageResults.find((res) => res.error);
    if (imageErrors) throw new Error('uploadPost: 이미지 테이블 저장 중 오류 발생');

    return { success: true };
  } catch (error) {
    console.error('uploadPost: 게시글 업로드 실패:', error);
    throw new Error('uploadPost: 게시글 업로드에 실패했습니다.');
  }
};
