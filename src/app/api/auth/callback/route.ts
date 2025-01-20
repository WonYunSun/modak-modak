import { NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@utils/supabase/server';
import { queryJoinGroup } from '@queries/join/queryJoinGroup';

export const GET = async (request: Request) => {
  const supabase = await createClient();
  const { searchParams, origin } = new URL(request.url);
  const error = searchParams.get('error');
  const code = searchParams.get('code');
  const referrer = searchParams.get('referrer');
  const data = searchParams.get('data');

  if (error || !code) {
    return NextResponse.redirect(`${origin}/login`);
  }
  await supabase.auth.exchangeCodeForSession(code);

  if (referrer === 'join') {
    const result = await joinGroup({ supabase, data });
    return NextResponse.redirect(`${origin}/join/${data}?is_successful=${result}`);
  }
  return NextResponse.redirect(`${origin}/signup`);
};

interface joinGroupParams {
  supabase: SupabaseClient;
  data: string | null;
}

const joinGroup = async ({ supabase, data }: joinGroupParams) => {
  try {
    if (!data) throw new Error();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw new Error();
    if (user && data) {
      await queryJoinGroup({ groupId: data, userId: user.id });
    } else {
      throw new Error();
    }
    return true;
  } catch {
    return false;
  }
};
