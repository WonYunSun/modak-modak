'use client';

import MemberCard from './MemberCard';
import { AddMember } from '@components/icons';
import useSmallAlert from '@hooks/useSmallAlert';

interface WaitingMemberListProps {
  isLeaderUser: boolean;
}
const WaitingMemberList = ({ isLeaderUser }: WaitingMemberListProps) => {
  const { SmallAlert: MemberAddedAlert, openAlert: OpenMemberAddedAlert } = useSmallAlert();

  return (
    <>
      <div>
        <div className="pt-5 font-semibold">
          <div className="px-5 py-3 flex items-center gap-2">
            <span>대기 멤버</span> <span className="text-primary">3</span>
          </div>
        </div>
        <div>
          <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} toastOpener={OpenMemberAddedAlert} />
          <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} toastOpener={OpenMemberAddedAlert} />
          <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} toastOpener={OpenMemberAddedAlert} />
        </div>
      </div>
      <MemberAddedAlert>
        <div className="flex gap-2.5">
          <AddMember />
          <span>{'멤버가 추가 되었어요!'}</span>
        </div>
      </MemberAddedAlert>
    </>
  );
};

export default WaitingMemberList;
