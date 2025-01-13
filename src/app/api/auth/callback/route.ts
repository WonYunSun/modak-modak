import { NextResponse } from 'next/server';
import { createClient } from '@utils/supabase/server';

export const GET = async (request: Request) => {
  const supabase = await createClient();
  const { searchParams, origin } = new URL(request.url);
  const error = searchParams.get('error');
  const code = searchParams.get('code');
  if (error || !code) {
    return NextResponse.redirect(`${origin}/login`);
  }
  await supabase.auth.exchangeCodeForSession(code);
  return NextResponse.redirect(`${origin}/signup`);
};
