import Image from 'next/image';
import MoveButton from './_components/MoveButton';

const SignupSuccessPage = () => {
  return (
    <div className="flex flex-col h-screen px-5 items-center reactive">
      <Image className='mt-[122px] mb-10' width={225} height={225} alt="welcome firecracker" src={'/icons/welcome.webp'}/>
      <div className="flex flex-col items-center leading-[140%]">
        <h1 className="text-[28px] font-bold mb-3">환영합니다!</h1>
        <p className="text-lg font-normal text-gray-700">가입이 완료되었어요</p>
        <p className="text-lg font-normal text-gray-700">다양한 추억을 마음껏 공유해주세요</p>
      </div>
      <MoveButton />
    </div>
  );
};

export default SignupSuccessPage;
