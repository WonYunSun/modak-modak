'use client';

import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';

interface AssureTransitionProps {
  onNextStep: () => void;
}
const AssureTransition = ({ onNextStep }: AssureTransitionProps) => {
  const { closeModal } = useModalStore();

  const onLeaderTransition = () => {
    onNextStep();
  };

  return (
    <>
      <div className="w-60 py-6 w-full text-left">
        <h4 className="mb-5 text-lg font-semibold text-gray-900">대표를 양도하시겠어요?</h4>
        <div className="text-gray-500">
          대표를 양도하면 멤버 관리 등의 <br /> 기능이 제한될 수 있어요
        </div>
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button type={'button'} className={'modal-full-btn'} label={'양도하기'} onClick={onLeaderTransition} />
        </div>
      </div>
    </>
  );
};

export default AssureTransition;
