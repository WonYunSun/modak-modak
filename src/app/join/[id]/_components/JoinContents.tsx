'use client';

import SpinnerContainer from '@components/common/SpinnerContainer';
import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/common/useUser';

const JoinContents = () => {
  const { user, isPending } = useUser();

  if (isPending) return <SpinnerContainer height={0} />;

  return (
    <div className="w-full h-full top-0 border-x border-gray-200 flex flex-col">
      {user ? <UserQueryJoin userId={user.id} /> : <NonUserQueryJoin />}
    </div>
  );
};

export default JoinContents;
