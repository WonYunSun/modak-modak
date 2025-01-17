'use client';

import useModalStore from '@stores/useModalStore';
import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import { Modification } from '@components/icons';
import UserDetails from '@app/mypage/_components/UserDetails';
import { ModalStatus } from '@app/mypage/_components/MyPageComponent';

interface ProfileSectionProps {
  setModalStatus: (state: ModalStatus) => void;
}

const ProfileSection = ({ setModalStatus }: ProfileSectionProps) => {
  const { openModal } = useModalStore();

  const handleIconClick = () => {
    setModalStatus('profileUpdate');
    openModal();
  };

  return (
    <>
      <ManagementSection title={'내 프로필'} isLast={true}>
        <div className="h-[104px] bg-gray-100 py-6 px-3 mx-5 mt-[10px] rounded-xl flex items-center">
          <UserDetails />
          <div className="ml-auto cursor-pointer w-[42px] h-[42px]" onClick={handleIconClick}>
            <Modification className="w-full h-full" />
          </div>
        </div>
      </ManagementSection>
    </>
  );
};

export default ProfileSection;
