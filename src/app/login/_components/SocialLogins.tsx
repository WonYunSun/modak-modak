'use client';

import Button from '@components/common/Button';
import { Provider } from '@supabase/supabase-js';
import { GoogleLogo, KakaoLogo } from '@components/icons';
import { createClient } from '@utils/supabase/client';

const SocialLogins = () => {
  const handleButtonClick = async (provider: Provider) => {
    const supabase = await createClient();
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: 'http://localhost:3000/api/auth/callback' }
    });
  };

  return (
    <div className="flex flex-col h-full">
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
