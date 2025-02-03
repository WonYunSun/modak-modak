'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/common/Button';

const LeavingSuccess = () => {
  const router = useRouter();

  const onLeavingSuccess = () => {
    router.push('/');
  };

  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">모임을 탈퇴했어요</h4>
        <div className="text-gray-500">다시 뵐 수 있으면 좋겠어요!</div>
      </div>
        <Button onClick={onLeavingSuccess} type={'button'} className={'w-full mt-5 full-btn'} label={'확인'} />
    </>
  );
};

export default LeavingSuccess;
