// 'use server';

// import { createClient } from '@utils/supabase/server';

// // Supabase 게시글 및 이미지 업로드
// export const uploadPost = async ({
//   userId,
//   content,
//   scheduleId,
//   groupId,
//   files
// }: {
//   userId: string;
//   content: string;
//   scheduleId: string;
//   groupId: string;
//   files: File[];
// }) => {
//   const supabase = createClient();

//   try {
//     // 1. 게시글 추가 (posts 테이블)
//     const { data: postData, error: postError } = await supabase
//       .from('posts')
//       .insert([
//         {
//           user_id: userId,
//           content,
//           schedule_id: scheduleId,
//           group_id: groupId
//         }
//       ])
//       .select('id')
//       .single(); // 새로 생성된 post의 id를 가져옴

//     if (postError) throw new Error(`uploadPost 게시글 업로드 실패: ${postError.message}`);

//     const postId = postData.id;

//     // 2. 이미지 업로드 (post_images 테이블)
//     const uploadedImageUrls: string[] = [];

//     for (const file of files) {
//       // Supabase 스토리지에 이미지 업로드
//       const { data, error } = await supabase.storage.from('images').upload(`public/post-photos/${file.name}`, file);

//       if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

//       // 이미지 경로 저장
//       const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
//       uploadedImageUrls.push(imageUrl);

//       // 3. post_images 테이블에 이미지 URL과 post_id 저장
//       const { error: imageInsertError } = await supabase.from('post_images').insert([
//         {
//           image_url: imageUrl,
//           post_id: postId
//         }
//       ]);

//       if (imageInsertError) throw new Error(`uploadPost 이미지 경로 저장 실패: ${imageInsertError.message}`);
//     }

//     return { success: true, postId };
//   } catch (error: any) {
//     console.error('업로드 오류:', error);
//     throw new Error(error.message);
//   }
// };
