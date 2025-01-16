'use client';

import Link from 'next/link';
import Button from '@components/common/Button';

const LeavingSuccess = () => {
  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">모임을 탈퇴했어요</h4>
        <div className="text-gray-500">다시 뵐 수 있으면 좋겠어요!</div>
      </div>
      <Link href="/" className="w-full mt-5">
        <Button type={'button'} className={'full-btn'} label={'확인'} />
      </Link>
    </>
  );
};

export default LeavingSuccess;
