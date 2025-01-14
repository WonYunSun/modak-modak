'use client';

import MemberCard from './MemberCard';

interface WaitingMemberListProps {
  isLeaderUser: boolean;
}
const WaitingMemberList = ({ isLeaderUser }: WaitingMemberListProps) => {
  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>대기 멤버</span> <span className="text-primary">3</span>
        </div>
      </div>
      <div>
        <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'waiting'} />
      </div>
    </div>
  );
};

export default WaitingMemberList;
