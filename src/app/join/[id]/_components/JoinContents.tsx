'use client';

import { useEffect, useState } from 'react';
import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/useUser';

const JoinContents = () => {
  const [userId, setUserId] = useState<string | null>('preLoad');
  const { user, isPending, isError } = useUser();

  useEffect(()=>{
    if(!isPending) {
      const fetchedUserId = user ? user.id : null;
      setUserId(fetchedUserId);
    }
  }, [user])

  return (
    <>
      <div className="h-screen w-screen">
        {isError && <div>Error!</div>}
        {userId ? <UserQueryJoin userId={userId} /> : <NonUserQueryJoin />}
        </div>
    </>
  );
};

export default JoinContents;
