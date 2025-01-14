import ManageMembersBtn from './ManageMembersBtn';

interface MemberCardBtnsProps {
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ isLeader, mode }: MemberCardBtnsProps) => {
  return (
    <>
      {mode === 'curMembers' && (isLeader ? <span className="text-primary">대표</span> : <ManageMembersBtn />)}
      {mode === 'waiting' && (
        <div>
          <button type="button">수락</button>
          <button type="button" className="ml-4 px-2.5 py-[0.438rem] bg-[#3B82F6] rounded-lg text-white font-semibold">
            거절
          </button>
        </div>
      )}
    </>
  );
};

export default MemberCardLeaderBtns;
