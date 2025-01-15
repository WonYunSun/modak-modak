'use client';

import Link from 'next/link';
import Button from '@components/common/Button';

const DeletionSuccess = () => {
  //버튼을 안 누르고 모달을 나가도 홈페이지로 튕기게 할 방법은 없을까
  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">모임이 삭제되었어요</h4>
        <div className="text-gray-500">다시 뵐 수 있으면 좋겠어요!</div>
      </div>
      <Link href="/" className="w-full mt-5">
        <Button type={'button'} className={'full-btn'} label={'확인'} />
      </Link>
    </>
  );
};

export default DeletionSuccess;
