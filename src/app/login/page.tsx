import SocialLogins from './_components/SocialLogins';

const LoginPage = () => {
  /**
   * @todo
   * 로그인 취소 될 경우 ?error=... 형태로 params 붙어서 이 페이지로 redirect
   * 에러 상황 사용자에게 보여 줄지 정해야 함
   * 보여줘야 한다면 토스트 훅 완성된 후에 적용 필요
   */

  return (
    <div className="h-svh pt-[152px] pb-[112px] px-5">
      {/**
       * @todo 온보딩 슬라이더 추가 필요
       */}
      <SocialLogins />
    </div>
  );
};

export default LoginPage;
