import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  const pathname = request.nextUrl.pathname;
  if (!isPublicRoute(pathname)) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    // 인증이 필요한 페이지인데 로그인하지 않은 경우 로그인 페이지로 이동
    if (!user && needsAuthentication(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // 로그인 한 상태인데 로그인 페이지에 접근하려는 경우 home으로 이동
    if (user && pathname.startsWith('/login')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
    // 유저 추가 정보 입력이 필요하지 않은데 회원가입 페이지에 접근하려는 경우 home으로 이동
    if (user && pathname.startsWith('/signup') && user.user_metadata.nickname) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

const isPublicRoute = (pathname: string) => {
  const paths: string[] = ['/api/auth/'];
  if (pathname === '/') return true;
  return paths.find((path) => pathname.startsWith(path)) !== undefined;
};

const needsAuthentication = (pathname: string): boolean => {
  const paths: string[] = [];
  return paths.find((path) => pathname.startsWith(path)) !== undefined;
};
