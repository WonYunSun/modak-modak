'use client';

import { useParams } from 'next/navigation';
import MemberCard from '@app/groups/[id]/management/members/_components/MemberCard';
import GlobalLoading from '@app/GlobalLoading';
import GlobalError from '@app/GlobalError';
import { AddMember } from '@components/icons';
import useFetchWaitingMembers from '@hooks/management/useFetchWaitingMembers';
import useSmallAlert from '@hooks/useSmallAlert';

interface WaitingMemberListProps {
  isLeaderUser: boolean;
}
const WaitingMemberList = ({ isLeaderUser }: WaitingMemberListProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { SmallAlert: MemberAddedAlert, openAlert } = useSmallAlert();

  const OpenMemberAddedAlert = () => {
    setTimeout(() => {
      openAlert(); // 쿼리 데이터 업데이트로 인한 리렌더링 이후 열림
    }, 800);
  };

  const { data, isPending, isError } = useFetchWaitingMembers({ groupId });

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  return (
    <>
      <div>
        <div className="pt-5 font-semibold">
          <div className="px-5 py-3 flex items-center gap-2">
            <span>대기 멤버</span> <span className="text-primary">{data ? data.length : 0}</span>
          </div>
        </div>
        <div>
          {data &&
            data.map((member) => (
              <MemberCard
                key={member.users.id}
                memberData={member}
                isLeaderUser={isLeaderUser}
                mode={'waiting'}
                toastOpener={OpenMemberAddedAlert}
              />
            ))}
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
