'use client';

import GlobalError from '@app/GlobalError';
import GlobalLoading from '@app/GlobalLoading';
import NonUserQueryJoin from '@app/join/[id]/_components/NonUserQueryJoin';
import UserQueryJoin from '@app/join/[id]/_components/UserQueryJoin';
import useUser from '@hooks/useUser';

const JoinContents = () => {
  const { user, isPending, isError } = useUser();

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  return (
    <div className="w-full h-full relative top-0">
      {user ? <UserQueryJoin userId={user.id} /> : <NonUserQueryJoin />}
    </div>
  );
};

export default JoinContents;
