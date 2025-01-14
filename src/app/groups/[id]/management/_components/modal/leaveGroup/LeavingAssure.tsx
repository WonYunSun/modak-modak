import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';

interface LeavingAssure {
  onNextStep: () => void;
}
const LeavingAssure = ({ onNextStep }: LeavingAssure) => {
  const { closeModal } = useModalStore();
  const onLeaveGroup = () => {
    onNextStep();
  };

  return (
    <>
      <div className="w-60 py-6 w-full text-left">
        <h4 className="mb-5 text-lg font-semibold text-gray-900">모임을 정말 탈퇴하시겠어요?</h4>
        <div className="w-full">
          모임을 탈퇴해도 <span className="font-semibold">작성한 글과</span>
          <br />
          <span className="font-semibold">댓글은 자동으로 삭제되지 않아요</span>
        </div>
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button type={'button'} className={'modal-full-btn'} label={'탈퇴하기'} onClick={onLeaveGroup} />
        </div>
      </div>
    </>
  );
};

export default LeavingAssure;
