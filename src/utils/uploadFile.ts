import { createClient } from './supabase/client';

export const uploadFile = async (storageName: string, path: string, file: File | null) => {
  if (!file) return '';
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(storageName).upload(`${path}/${crypto.randomUUID()}`, file);
  if (error) return '';
  return supabase.storage.from(storageName).getPublicUrl(data.path).data.publicUrl;
};
