'use client';

import Button from '@components/common/Button';
import { Provider } from '@supabase/supabase-js';
import { createClient } from '@utils/supabase/client';
import React from 'react';

const LoginPage = () => {
  const handleButtonClick = async (provider: Provider) => {
    const supabase = await createClient();
    supabase.auth.signInWithOAuth({
      provider: provider
    });
  };

  return (
    <div className="h-svh pt-[152px] pb-[112px] px-5">
      <div className="flex flex-col h-full">
        {/* <div className='flex flex-col items-center mb-[114px]'>
          <img src='/login/onboarding1.webp' className='h-[130px] w-[130px]'></img>
        </div> */}
        <Button
          className="kakao-btn mb-4"
          label="카카오로 시작하기"
          type="button"
          onClick={() => handleButtonClick('kakao')}
        ></Button>
        <Button
          className="google-btn"
          label="Google로 시작하기"
          type="button"
          onClick={() => handleButtonClick('google')}
        ></Button>
      </div>
    </div>
  );
};

export default LoginPage;
