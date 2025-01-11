import React from 'react'
import MemberCard from './MemberCard';

const WaitingMemberList = () => {
  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>대기 멤버</span> <span className="text-primary">3</span>
        </div>
      </div>
      <div>
        <MemberCard isLeader={false} mode={'waiting'} />
        <MemberCard isLeader={false} mode={'waiting'} />
        <MemberCard isLeader={false} mode={'waiting'} />
      </div>
    </div>
  );
}

export default WaitingMemberList