'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@utils/supabase/server';

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (referrer === 'join' && user?.user_metadata.nickname) {
    return NextResponse.redirect(`${origin}/join/${data}`);
  }
  return NextResponse.redirect(`${origin}/signup?referrer=${referrer}&data=${data}`);
};
