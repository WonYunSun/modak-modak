import { User } from '@supabase/supabase-js';
import { queryJoinGroup } from '@queries/join/queryJoinGroup';

interface joinGroupParams {
  groupId: string | null;
  user: User | null;
}

export const joinGroup = async ({ groupId, user }: joinGroupParams) => {
  try {
    if (!groupId) throw new Error();
    if (user && groupId) {
      await queryJoinGroup({ groupId: groupId, userId: user.id });
    } else {
      throw new Error();
    }
    return true;
  } catch {
    return false;
  }
};
