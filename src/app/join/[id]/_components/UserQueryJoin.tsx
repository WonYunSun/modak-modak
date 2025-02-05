'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import UserQueryJoinStepOne from '@app/join/[id]/_components/UserQueryJoinStepOne';
import UserQueryJoinStepTwo from '@app/join/[id]/_components/UserQueryJoinStepTwo';
import SpinnerContainer from '@components/common/SpinnerContainer';
import GlobalError from '@components/common/GlobalError';
import useIsAlreadyJoin from '@hooks/join/useIsAlreadyJoin';
import { queryJoinGroup } from '@queries/join/queryJoinGroup';
import { UsersType } from '@ts/supabaseTableRowTypes';

const JOINSTATE = {
  member: '이미 가입한 모임이에요!',
  waiting: '이미 가입 신청한 모임이에요!',
  joinable: '모임 가입 신청하기',
};

interface UserQueryJoinProps {
  userId: UsersType['id'];
}
const UserQueryJoin = ({ userId }: UserQueryJoinProps) => {
  const [joinStep, setJoinStep] = useState(1);

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: joinStateData, isPending, isError } = useIsAlreadyJoin({ groupId });

  const onQueryJoin = async () => {
    await queryJoinGroup({ groupId, userId });
    setJoinStep(2);
  };

  if (isPending) return <SpinnerContainer height={0} />;
  if (isError) return <GlobalError />;

  return (
    <>
      {joinStep === 1 && joinStateData && (
        <>
          <UserQueryJoinStepOne
            onQueryJoin={onQueryJoin}
            buttonLabel={JOINSTATE[joinStateData]}
            joinState={joinStateData}
            isJoinable={!!(joinStateData === 'joinable')}
          />
        </>
      )}
      {joinStep === 2 && <UserQueryJoinStepTwo />}
    </>
  );
};

export default UserQueryJoin;
