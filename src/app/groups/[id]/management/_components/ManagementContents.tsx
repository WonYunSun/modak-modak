'use client';

import { useState } from 'react';
import useModalStore from 'stores/useModalStore';
import ManagementSection from './ManagementSection';
import ManagementCard from './ManagementCard';
import ToggleBox from './ToggleBox';
import ManagementBtns from './ManagementBtns';
import ManagementModal from './modal/ManagementModal';
import { Copy, NextArrow } from '@components/icons';

export type ModalModeType = 'changeProfile' | 'deleteGroup' | 'leaveGroup' | 'leaderTransition';
interface ManagementContentsProps {
  id: string;
}
const ManagementContents = ({ id }: ManagementContentsProps) => {
  //52f44a96-b8f7-4c6c-80b1-d657eafd3821 모닥모닥팀 아이디
  //1113b74a-2ec2-4f35-b044-4f42925cc076 얼그레이 연구회 아이디
  const [modalMode, setModalMode] = useState<ModalModeType | null>(null);
  const { openModal } = useModalStore();
  const handleOpenModal = async (mode: ModalModeType) => {
    setModalMode(mode);
    openModal();
  };
  const isLeader = true;

  return (
    <>
      <div className="pt-6 mb-36">
        <div className="mb-6 w-full flex flex-col gap-y-2 border-b bg-gray-200">
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
            <ManagementCard label={'멤버 초대링크 복사하기'}>
              <Copy />
            </ManagementCard>
            <ManagementCard label={'멤버 목록'} link={`/groups/${id}/management/members`}>
              <NextArrow />
            </ManagementCard>
          </ManagementSection>
        </div>
        <ManagementBtns isLeader={isLeader} handleOpenModal={handleOpenModal} />
      </div>
      <ManagementModal isLeader={isLeader} modalMode={modalMode} />
    </>
  );
};

export default ManagementContents;
