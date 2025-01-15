'use client';

import ManageMembersBtn from './ManageMembersBtn';

interface MemberCardBtnsProps {
  toastOpener: (() => void) | null;
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ isLeader, mode, toastOpener }: MemberCardBtnsProps) => {
  const onPermit = () => {
    if (toastOpener) toastOpener();
  };
  return (
    <>
      {mode === 'curMembers' && (isLeader ? <span className="text-primary">대표</span> : <ManageMembersBtn />)}
      {mode === 'waiting' && (
        <div>
          <button type="button" onClick={onPermit}>
            수락
          </button>
          <button type="button" className="ml-4 px-2.5 py-[0.438rem] bg-[#3B82F6] rounded-lg text-white font-semibold">
            거절
          </button>
        </div>
      )}
    </>
  );
};

export default MemberCardLeaderBtns;
