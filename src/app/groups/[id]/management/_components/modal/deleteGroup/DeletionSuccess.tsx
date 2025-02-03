'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/common/Button';

const DeletionSuccess = () => {
  const router = useRouter();

  const onDeleteGroupSuccess = () => {
    router.push('/');
  };
  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">모임이 삭제되었어요</h4>
        <div className="text-gray-500">다시 뵐 수 있으면 좋겠어요!</div>
      </div>
      <Button onClick={onDeleteGroupSuccess} type={'button'} className={'w-full mt-5 full-btn'} label={'확인'} />
    </>
  );
};

export default DeletionSuccess;
