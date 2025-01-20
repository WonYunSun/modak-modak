'use client';

import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';

const AskLeaderTransition = () => {
  const { closeModal } = useModalStore();
  return (
    <>
      <div className="py-6 w-full text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">먼저 대표를 양도해주세요</h4>
        <div className="w-full">
          양도는 관리 페이지의 멤버 목록에서 <br /> 할 수 있어요
        </div>
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <Button type={'button'} className={'full-btn'} label={'확인'} onClick={closeModal} />
      </div>
    </>
  );
};

export default AskLeaderTransition;
