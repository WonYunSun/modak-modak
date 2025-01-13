import FunnelHeader from '@components/common/FunnelHeader';
import SignupForm from './_components/SignupForm';

const SignupPage = () => {
  return (
    <div className='flex flex-col px-5 h-screen'>
      <FunnelHeader label="회원가입" />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
