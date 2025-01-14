'use client';

import { useState } from 'react';
import CurMemberList from './CurMemberList';
import WaitingMemberList from './WaitingMemberList';
import MembersBottomSheet from './MembersBottomSheet';
import ManagementModal from '../../_components/modal/ManagementModal';

type TabType = 'currentMembers' | 'awaitingMembers';

const MembersPageContents = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('currentMembers');
  const handleCurMemTabClick = () => {
    setSelectedTab('currentMembers');
  };
  const handleAwaitMemTabClick = () => {
    setSelectedTab('awaitingMembers');
  };
  const isLeaderUser = true;

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
        <CurMemberList isLeaderUser={isLeaderUser} />
      ) : (
        <WaitingMemberList isLeaderUser={isLeaderUser} />
      )}
      <ManagementModal isLeader={isLeaderUser} modalMode={'leaderTransition'} />
      <MembersBottomSheet/>
    </>
  );
};

export default MembersPageContents;
