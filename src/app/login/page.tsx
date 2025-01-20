import { Suspense } from 'react';
import Onboarding from './_components/Onboarding';
import SocialLogins from './_components/SocialLogins';

const LoginPage = () => {
  /**
   * @todo
   * 로그인 취소 될 경우 ?error=... 형태로 params 붙어서 이 페이지로 redirect
   * 에러 상황 사용자에게 보여 줄지 정해야 함
   * 보여줘야 한다면 토스트 훅 완성된 후에 적용 필요
   */

  return (
    <div className="flex flex-col h-screen pb-[112px] pt-[119px] inner overflow-y-auto">
      <Onboarding />
      <Suspense>
        <SocialLogins />
      </Suspense>
    </div>
  );
};

export default LoginPage;
