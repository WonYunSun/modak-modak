'use client';

import Button from '@components/common/Button';
import { Provider } from '@supabase/supabase-js';
import { GoogleLogo, KakaoLogo } from '@components/icons';
import { createClient } from '@utils/supabase/client';
import { useSearchParams } from 'next/navigation';

const SocialLogins = () => {
  const params = useSearchParams();

  const handleButtonClick = async (provider: Provider) => {
    const supabase = createClient();
    let redirectUrl = `${window.origin}/api/auth/callback`;
    const referrer = params.get('referrer');
    if (referrer === 'join') {
      redirectUrl += `?referrer=${referrer}&data=${params.get('data')}`;
    }
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: redirectUrl },
    });
  };

  return (
    <div className="flex flex-col">
      <Button
        className="kakao-btn mb-4"
        label="카카오로 시작하기"
        type="button"
        onClick={() => handleButtonClick('kakao')}
      >
        <KakaoLogo />
      </Button>
      <Button
        className="google-btn"
        label="Google로 시작하기"
        type="button"
        onClick={() => handleButtonClick('google')}
      >
        <GoogleLogo />
      </Button>
    </div>
  );
};

export default SocialLogins;
