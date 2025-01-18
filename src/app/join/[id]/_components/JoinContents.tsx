'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/useUser';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';
import GroupCard from '@components/common/groupCard/GroupCard';

const JoinContents = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const [userId, setUserId] = useState<string | null>('preLoad');
  const { user, isPending, isError } = useUser();
  const { data: groupInfo } = useFetchGetGroup(groupId);

  useEffect(() => {
    if (!isPending) {
      const fetchedUserId = user ? user.id : null;
      setUserId(fetchedUserId);
    }
  }, [user]);

  return (
    <div>
      {groupInfo && (<div className='px-5'> <h6 className='text-gray-500 mb-3'>초대된 모임</h6> <GroupCard groupInfo={groupInfo} hasLink={false} /></div> )}
      {isError && <div>Error!</div>}
      {userId ? <UserQueryJoin userId={userId} /> : <NonUserQueryJoin />}
    </div>
  );
};

export default JoinContents;
