'use client';

import { useState } from 'react';
import useModalStore from '@stores/useModalStore';
import ManagementSection from '@app/groups/[id]/management/_components/ManagementSection';
import ManagementCard from '@app/groups/[id]/management/_components/ManagementCard';
import ToggleBox from '@app/groups/[id]/management/_components/ToggleBox';
import ManagementBtns from '@app/groups/[id]/management/_components/ManagementBtns';
import ManagementModal from '@app/groups/[id]/management/_components/modal/ManagementModal';
import SpinnerContainer from '@components/common/SpinnerContainer';
import GlobalError from '@components/common/GlobalError';
import { CircleOk, Copy, NextArrow } from '@components/icons';
import useSmallAlert from '@hooks/useSmallAlert';
import useIsLeader from '@hooks/management/useIsLeader';

export type ModalModeType = 'changeProfile' | 'deleteGroup' | 'leaveGroup' | 'leaderTransition';
interface ManagementContentsProps {
  groupId: string;
}
const ManagementContents = ({ groupId }: ManagementContentsProps) => {
  const [modalMode, setModalMode] = useState<ModalModeType | null>(null);
  const { openModal } = useModalStore();
  const { SmallAlert: LinkCopiedAlert, openAlert: OpenLinkCopiedAlert } = useSmallAlert();

  const onCopyInvitationLink = () => {
    const origin = window.location.origin;
    navigator.clipboard.writeText(`${origin}/join/${groupId}`);
    OpenLinkCopiedAlert();
  };

  const handleOpenModal = async (mode: ModalModeType) => {
    setModalMode(mode);
    openModal();
  };

  const { data: isLeader, isPending, isError } = useIsLeader({ groupId });

  if (isPending) return <SpinnerContainer height={112} />;
  if (isError) return <GlobalError />;

  return (
    <>
      <div className="pt-6 mb-36">
        <div className="mb-6 w-full flex flex-col border-b divide-y-8 divide-gray-200">
          {isLeader && (
            <ManagementSection title={'모임 관리'}>
              <ManagementCard
                label={'모임 프로필 변경'}
                handleClick={() => {
                  handleOpenModal('changeProfile');
                }}
              >
                <NextArrow />
              </ManagementCard>
            </ManagementSection>
          )}

          <ManagementSection title={'알림 관리'}>
            <ManagementCard label={'모임방 전체 알림'}>
              <ToggleBox isChecked={false} />
            </ManagementCard>
          </ManagementSection>

          <ManagementSection title={'멤버 관리'} isLast={true}>
            <ManagementCard label={'멤버 초대링크 복사하기'} handleClick={onCopyInvitationLink}>
              <Copy />
            </ManagementCard>
            <ManagementCard label={'멤버 목록'} link={`/groups/${groupId}/management/members`}>
              <NextArrow />
            </ManagementCard>
          </ManagementSection>
        </div>
        <ManagementBtns isLeader={isLeader ? isLeader : false} handleOpenModal={handleOpenModal} />
      </div>
      <ManagementModal isLeader={isLeader ? isLeader : false} modalMode={modalMode} />
      <LinkCopiedAlert>
        <div className="flex gap-2.5">
          <CircleOk /> <span>{'초대링크가 복사 되었어요!'}</span>
        </div>
      </LinkCopiedAlert>
    </>
  );
};

export default ManagementContents;
