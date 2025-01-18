'use server';

import { createClient } from '@utils/supabase/server';
import { GroupsType } from '@ts/supabaseTableRowTypes';

interface DeleteGroupParams {
  groupId: GroupsType['id'];
}
export const deleteGroup = async ({ groupId }: DeleteGroupParams) => {
  try {
    const supabase = await createClient();

    await supabase.from('groups').delete().eq('id', groupId);
  } catch (error) {
    throw new Error(`${error}`);
  }
};