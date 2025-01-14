import MemberCard from './MemberCard';

interface CurMemberListProps {
  isLeaderUser: boolean;
}
const CurMemberList = ({ isLeaderUser }: CurMemberListProps) => {
  //나의 멤버카드가 리스트의 최상단에 오나?
  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>현재 참여 멤버</span> <span className="text-primary">6</span>
        </div>
      </div>
      <div>
        <MemberCard isLeaderUser={isLeaderUser} mode={'curMembers'} isMe={true} />
        <MemberCard isLeaderUser={isLeaderUser} isLeader={true} mode={'curMembers'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'curMembers'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'curMembers'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'curMembers'} />
        <MemberCard isLeaderUser={isLeaderUser} mode={'curMembers'} />
      </div>
    </div>
  );
};

export default CurMemberList;
