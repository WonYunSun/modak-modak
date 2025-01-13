'use client'

import Button from "@components/common/Button";
import useModalStore from "stores/useModalStore";

interface DeletionAssureProps {
  onNextStep: () => void;
}
const DeletionAssure = ({ onNextStep }: DeletionAssureProps) => {
  const { closeModal } = useModalStore();
  
  return (
    <>
      <div className="py-6 w-full text-left">
        <h4 className="mb-5 text-lg font-semibold text-gray-900">모임을 삭제하신다니 아쉬워요</h4>
        <div className="w-full mb-3">
          모임을 삭제하시면
          <br />
          <span className="font-semibold">다시 되돌릴 수 없어요</span>
        </div>
        <div className="w-full ">다른 멤버들도 알고 계시나요?</div>
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button type={'button'} className={'modal-full-btn'} label={'네, 알고 있어요'} onClick={onNextStep} />
        </div>
      </div>
    </>
  );
};

export default DeletionAssure;
