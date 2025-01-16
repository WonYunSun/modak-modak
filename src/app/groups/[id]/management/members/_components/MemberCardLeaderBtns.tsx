'use client';

import { useParams } from 'next/navigation';
import ManageMembersBtn from '@app/groups/[id]/management/members/_components/ManageMembersBtn';
import usePermitNewUser from '@hooks/management/usePermitNewUser';
import useRefuseNewUser from '@hooks/management/useRefuseNewMember';
import { UsersType } from '@queries/home/fetchGroupInfo';

interface MemberCardBtnsProps {
  memberId: UsersType['id'];
  toastOpener: (() => void) | null;
  isLeader: boolean;
  mode: 'curMembers' | 'waiting';
}
const MemberCardLeaderBtns = ({ memberId, isLeader, mode, toastOpener }: MemberCardBtnsProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const permitNewUser = usePermitNewUser({ groupId, waitingUserId: memberId });
  const refuseNewUser = useRefuseNewUser({ groupId, waitingUserId: memberId });

  const onPermit = async () => {
    permitNewUser();
    if (toastOpener) toastOpener();
  };

  const onRefuse = async () => {
    console.log('hi');
    refuseNewUser();
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
          <button
            type="button"
            onClick={onRefuse}
            className="ml-4 px-2.5 py-[0.438rem] bg-[#3B82F6] rounded-lg text-white font-semibold"
          >
            거절
          </button>
        </div>
      )}
    </>
  );
};

export default MemberCardLeaderBtns;
