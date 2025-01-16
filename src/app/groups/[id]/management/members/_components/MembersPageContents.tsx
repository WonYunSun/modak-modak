'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CurMemberList from '@app/groups/[id]/management/members/_components/CurMemberList';
import WaitingMemberList from '@app/groups/[id]/management/members/_components/WaitingMemberList';
import MembersBottomSheet from '@app/groups/[id]/management/members/_components/MembersBottomSheet';
import ManagementModal from '@app/groups/[id]/management/_components/modal/ManagementModal';
import useIsLeader from '@hooks/management/useIsLeader';

type TabType = 'currentMembers' | 'awaitingMembers';

const MembersPageContents = () => {
  const path = usePathname();
  const groupId = path.split('/').filter((segment) => segment !== '')[1];

  const [selectedTab, setSelectedTab] = useState<TabType>('currentMembers');

  const handleCurMemTabClick = () => {
    setSelectedTab('currentMembers');
  };

  const handleAwaitMemTabClick = () => {
    setSelectedTab('awaitingMembers');
  };

  const { data: isLeaderUser, isPending, isError } = useIsLeader({ groupId });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <>
      <div className="w-full">
        <div className="px-5 flex justify-between items-center">
          <div
            onClick={handleCurMemTabClick}
            className={`w-[10.469rem] py-3 text-center ${selectedTab === 'currentMembers' ? 'font-semibold border-b-2 border-gray-900' : ''}`}
          >
            참여 중
          </div>
          <div
            onClick={handleAwaitMemTabClick}
            className={`w-[10.469rem] py-3 text-center ${selectedTab === 'awaitingMembers' ? 'font-semibold border-b-2 border-gray-900' : ''}`}
          >
            대기 중
          </div>
        </div>
      </div>

      {selectedTab === 'currentMembers' ? (
        <CurMemberList isLeaderUser={isLeaderUser ? isLeaderUser : false} />
      ) : (
        <WaitingMemberList isLeaderUser={isLeaderUser ? isLeaderUser : false} />
      )}
      <ManagementModal isLeader={isLeaderUser ? isLeaderUser : false} modalMode={'leaderTransition'} />
      <MembersBottomSheet />
    </>
  );
};

export default MembersPageContents;
