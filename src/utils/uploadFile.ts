import { createClient } from './supabase/client';

export const uploadFile = async (storageName: string, path: string, file: File | null) => {
  if (!file) throw new Error('파일이 선택되지 않았습니다.');
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(storageName).upload(`${path}/${crypto.randomUUID()}`, file);
  if (error) throw new Error('파일 업로드에 실패했습니다.');
  return supabase.storage.from(storageName).getPublicUrl(data.path).data.publicUrl;
};
