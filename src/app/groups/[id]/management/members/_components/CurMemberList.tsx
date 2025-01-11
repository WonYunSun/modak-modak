import React from 'react'
import MemberCard from './MemberCard';

const CurMemberList = () => {
  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>현재 참여 멤버</span> <span className="text-primary">6</span>
        </div>
      </div>
      <div>
        <MemberCard isLeader={true} mode={'curMembers'} />
        <MemberCard isLeader={false} mode={'curMembers'} isMe={true}/>
        <MemberCard isLeader={false} mode={'curMembers'} />
        <MemberCard isLeader={false} mode={'curMembers'} />
        <MemberCard isLeader={false} mode={'curMembers'} />
        <MemberCard isLeader={false} mode={'curMembers'} />
      </div>
    </div>
  );
}

export default CurMemberList