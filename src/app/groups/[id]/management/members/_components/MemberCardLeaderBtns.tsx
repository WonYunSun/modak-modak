'use client';

import ManageMembersBtn from "@app/groups/[id]/management/members/_components/ManageMembersBtn";
import { UsersType } from "@queries/home/fetchGroupInfo";

interface MemberCardBtnsProps {
  memberId: UsersType['id'];
  toastOpener: (() => void) | null;
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ memberId, isLeader, mode, toastOpener }: MemberCardBtnsProps) => {
  const onPermit = () => {
    if (toastOpener) toastOpener();
  };
  return (
    <>
      {mode === 'curMembers' &&
        (isLeader ? <span className="text-primary">대표</span> : <ManageMembersBtn memberId={memberId} />)}
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
