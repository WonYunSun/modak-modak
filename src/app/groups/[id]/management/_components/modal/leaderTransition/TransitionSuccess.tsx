'use client';

import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';

const TransitionSuccess = () => {
  const { closeModal } = useModalStore();

  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">대표가 양도되었어요</h4>
        <div className="text-gray-500">권한이 일반 멤버로 변경되었어요</div>
      </div>
      <div className="w-full mt-5">
        <Button type={'button'} className={'full-btn'} label={'확인'} onClick={closeModal} />
      </div>
    </>
  );
};

export default TransitionSuccess;
