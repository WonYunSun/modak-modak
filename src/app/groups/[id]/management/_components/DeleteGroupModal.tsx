import Button from '@components/common/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useModalStore from 'stores/useModalStore';

const DeletionSuccess = () => {
  //버튼을 안 누르고 모달을 나가도 홈페이지로 튕기게 할 방법은 없을까
  return (
    <>
      <div className="w-full py-6 text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">모임이 삭제되었어요</h4>
        <div className="text-gray-500">다시 뵐 수 있으면 좋겠어요!</div>
      </div>
      <Link href="/" className='w-full mt-5'>
        <Button type={'button'} className={'full-btn'} label={'확인'} />
      </Link>
    </>
  );
};

interface DeletionConfirmProps {
  onNextStep: () => void;
  onConfirmDelete: () => void;
}
const DeletionConfirm = ({ onNextStep, onConfirmDelete }: DeletionConfirmProps) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [confirmationInput, setConfirmationInput] = useState('');
  const { closeModal } = useModalStore();

  const onDeleteGroup = () => {
    onConfirmDelete();
    onNextStep();
  };

  useEffect(() => {
    if (confirmationInput === '삭제') {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [confirmationInput]);

  return (
    <>
      <div className="w-60 py-6 w-full text-left">
        <div className="w-full mb-5 text-lg font-semibold">
          모임을 삭제하시려면
          <br />
          '삭제'라고 입력해주세요
        </div>
        <input
          type="text"
          placeholder="삭제라는 글자를 입력해주세요"
          className="px-4 py-3 text-base rounded-lg border border-solid border-gray-300 focus:outline-gray-700"
          onChange={(e) => {
            setConfirmationInput(e.currentTarget.value);
          }}
        />
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button
            type={'button'}
            className={'modal-full-btn'}
            label={'삭제'}
            onClick={onDeleteGroup}
            disabled={isBtnDisabled}
          />
        </div>
      </div>
    </>
  );
};

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

const DeleteGroupModal = () => {
  const [deletionStep, setDeletionStep] = useState(1);
  const onNextStep = () => {
    setDeletionStep((prev) => prev + 1);
  };
  const onConfirmDelete = () => {};

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {deletionStep === 1 && <DeletionAssure onNextStep={onNextStep} />}
      {deletionStep === 2 && <DeletionConfirm onNextStep={onNextStep} onConfirmDelete={onConfirmDelete} />}
      {deletionStep === 3 && <DeletionSuccess />}
    </div>
  );
};

export default DeleteGroupModal;
