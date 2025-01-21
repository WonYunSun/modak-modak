'use client';

import { useParams } from 'next/navigation';
import ManageMembersBtn from '@app/groups/[id]/management/members/_components/ManageMembersBtn';
import usePermitNewMember from '@hooks/management/usePermitNewMember';
import useRefuseNewMember from '@hooks/management/useRefuseNewMember';
import { UsersType } from '@ts/supabaseTableRowTypes';

interface MemberCardBtnsProps {
  memberId: UsersType['id'];
  toastOpener: (() => void) | null;
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ memberId, isLeader, mode, toastOpener }: MemberCardBtnsProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const permitNewMember = usePermitNewMember({ groupId, waitingUserId: memberId });
  const refuseNewMember = useRefuseNewMember({ groupId, waitingUserId: memberId });

  const onPermit = async () => {
    permitNewMember();
    if (toastOpener) toastOpener();
  };

  const onRefuse = async () => {
    refuseNewMember();
  };

  return (
    <>
      {mode === 'curMembers' &&
        (isLeader ? <span className="text-primary">대표</span> : <ManageMembersBtn memberId={memberId} />)}
      {mode === 'waiting' && (
        <div>
          <button type="button" onClick={onRefuse}>
            거절
          </button>
          <button
            type="button"
            className="ml-4 px-2.5 py-[0.438rem] bg-[#3B82F6] rounded-lg text-white font-semibold"
            onClick={onPermit}
          >
            수락
          </button>
        </div>
      )}
    </>
  );
};

export default MemberCardLeaderBtns;
