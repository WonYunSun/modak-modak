'use client';

import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/useUser';

const JoinContents = () => {
  const { user, isError } = useUser();

  return (
    <div className="w-full h-full relative top-0">
      {isError && <div>Error!</div>}
      {user !== undefined && <>{user ? <UserQueryJoin userId={user.id} /> : <NonUserQueryJoin />}</>}
    </div>
  );
};

export default JoinContents;
