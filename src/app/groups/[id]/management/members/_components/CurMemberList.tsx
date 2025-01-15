'use client';

import { usePathname } from 'next/navigation';
import MemberCard from './MemberCard';
import useFetchCurMembers from '@hooks/management/useFetchCurMembers';

const DEFAULTDATA = {
  group_id: '',
  is_approved: true,
  is_leader: false,
  users: { id: '', nickname: '', profile_image: '' },
};

interface CurMemberListProps {
  isLeaderUser: boolean;
}
const CurMemberList = ({ isLeaderUser }: CurMemberListProps) => {
  const path = usePathname();
  const groupId = path.split('/').filter((c) => c !== '')[1];

  const { data: curMemberList, isPending, isError } = useFetchCurMembers({ groupId });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  //유저가 리더가 아닐 때 멤버 데이터에서 리더 데이터를 뽑아내기
  const filteredLeaderData =
    isLeaderUser || !curMemberList ? null : curMemberList.others.find((member) => member.is_leader === true);
  const leaderData = filteredLeaderData ? filteredLeaderData : DEFAULTDATA;
  
  //리더를 제외한 멤버들의 데이터
  const filteredData = !curMemberList ? null : curMemberList.others.filter((member) => member.is_leader !== true);

  return (
    <div>
      <div className="pt-5 font-semibold">
        <div className="px-5 py-3 flex items-center gap-2">
          <span>현재 참여 멤버</span>
          <span className="text-primary">{curMemberList ? curMemberList.others.length + 1 : '...'}</span>
        </div>
      </div>
      <div>
        {curMemberList && (
          <>
            {isLeaderUser ? (
              <>
                <MemberCard
                  memberData={curMemberList.me}
                  isLeaderUser={isLeaderUser}
                  mode={'curMembers'}
                  isLeader={true}
                  isMe={true}
                />
              </>
            ) : (
              <>
                <MemberCard memberData={curMemberList.me} isLeaderUser={isLeaderUser} mode={'curMembers'} isMe={true} />
                <MemberCard memberData={leaderData} isLeaderUser={isLeaderUser} mode={'curMembers'} isLeader={true} />
              </>
            )}
            {filteredData?.map((member) => (
              <MemberCard key={member.users.id} memberData={member} isLeaderUser={isLeaderUser} mode={'curMembers'} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CurMemberList;
