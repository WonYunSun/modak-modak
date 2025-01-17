import { useRouter } from 'next/navigation';
import useModalStore from '@stores/useModalStore';
import Button from '@components/common/Button';
import { createClient } from '@utils/supabase/client';

const LogoutModalContent = () => {
  const router = useRouter();
  const { closeModal } = useModalStore();

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    /**
     * @todo 토스트 교체
     */
    if (error) return alert('로그아웃에 실패했습니다.');
    closeModal();
    router.push('/login');
  };

  return (
    <>
      <div className="px-4 py-6 w-full text-left">
        <h4 className="mb-1 text-lg font-semibold text-gray-900">로그아웃 하시겠어요?</h4>
        <div className="w-full">
          <p className="text-base text-gray-500 leading-[140%] font-normal">원하시면 확인을 눌러주세요.</p>
        </div>
      </div>
      <div className="w-full mt-[1.125rem] flex gap-2 justify-center">
        <div className="w-[4.375rem]">
          <Button type={'button'} className={'modal-white-btn'} label={'취소'} onClick={closeModal} />
        </div>
        <div className="w-44">
          <Button type={'button'} className={'modal-full-btn'} label={'확인'} onClick={logout} />
        </div>
      </div>
    </>
  );
};

export default LogoutModalContent;
