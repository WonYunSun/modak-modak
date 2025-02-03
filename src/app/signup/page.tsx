import { Suspense } from 'react';
import FunnelHeader from '@components/common/FunnelHeader';
import SignupForm from './_components/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col h-screen max-w-[600px] mx-auto">
      <FunnelHeader label="회원가입" />
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
};

export default SignupPage;
