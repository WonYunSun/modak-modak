'use client';

import Button from '@components/common/Button';
import useModalStore from '@stores/useModalStore';

interface ProfileConfirmBtnsProps {
  onConfirm: () => void;
}
const ProfileConfirmBtns = ({ onConfirm }: ProfileConfirmBtnsProps) => {
  const { closeModal } = useModalStore();
  const onConfirmChange = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <div className="w-[4.375rem]">
        <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
      </div>
      <div className="w-[12.313rem]">
        <Button type={'button'} className={'modal-full-btn'} label={'완료'} onClick={onConfirmChange} />
      </div>
    </>
  );
};

export default ProfileConfirmBtns;
