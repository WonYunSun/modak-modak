import { createClient } from '@utils/supabase/client';

const getOtherUser = async (userId: string) => {
  const supabase = createClient();

  const { data: otherUserData, error: otherUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (otherUserError) {
    throw new Error('채팅 상대 유저 정보를 가져오는 중 에러가 발생했습니다.');
  }

  return otherUserData;
};

export default getOtherUser;
