'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@components/common/Button';

const UserQueryJoinStepTwo = () => {
  const router = useRouter();

  const onClickHome = () => {
    router.push('/');
  };

  return (
    <div className="pt-[48px] w-full h-full flex flex-col gap-8">
      <div className="w-full flex-grow text-center flex items-center justify-center">
        <div className="text-lg text-gray-700">
          <Image
            width={226}
            height={169}
            src="/icons/join-high-five.webp"
            alt="successfully-joined-icon"
            className="m-auto mb-8"
          />
          <h4 className="text-gray-800 text-2xl font-bold mb-3">
            성공적으로 가입을 <br /> 신청했어요!
          </h4>
          <span>
            모임 대표가 확인 후 가입을 수락할 예정이에요 <br />
            조금만 기다려주세요!
          </span>
        </div>
      </div>
      <div className="px-5 w-full pb-[12px]">
        <Button type="button" className="full-btn" onClick={onClickHome} label="홈으로 가기" />
      </div>
    </div>
  );
};

export default UserQueryJoinStepTwo;
