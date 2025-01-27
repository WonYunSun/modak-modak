'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import UserQueryJoinStepOne from '@app/join/[id]/_components/UserQueryJoinStepOne';
import UserQueryJoinStepTwo from '@app/join/[id]/_components/UserQueryJoinStepTwo';
import GlobalLoading from '@components/common/GlobalLoading';
import GlobalError from '@app/GlobalError';
import useIsAlreadyJoin from '@hooks/join/useIsAlreadyJoin';
import { queryJoinGroup } from '@queries/join/queryJoinGroup';
import { UsersType } from '@ts/supabaseTableRowTypes';

const JOINSTATE = {
  member: '이미 가입한 모임이에요',
  waiting: '이미 가입 신청했어요',
  joinable: '모임 가입하기',
};

interface UserQueryJoinProps {
  userId: UsersType['id'];
}
const UserQueryJoin = ({ userId }: UserQueryJoinProps) => {
  const searchParams = useSearchParams();

  //회원가입과 멤버 신청을 마친 비로그인 유저 판별
  const isJoinSuccessful = searchParams.get('is_successful');
  const initialStep = isJoinSuccessful ? 2 : 1;

  const [joinStep, setJoinStep] = useState(initialStep);

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: joinStateData, isPending, isError } = useIsAlreadyJoin({ groupId });

  const onQueryJoin = async () => {
    await queryJoinGroup({ groupId, userId });
    setJoinStep(2);
  };

  if (isPending) return <GlobalLoading />;
  if (isError) return <GlobalError />;

  return (
    <>
      {joinStep === 1 && joinStateData && (
        <>
          <UserQueryJoinStepOne
            onQueryJoin={onQueryJoin}
            buttonLabel={JOINSTATE[joinStateData]}
            isJoinable={!!(joinStateData === 'joinable')}
          />
        </>
      )}
      {joinStep === 2 && <UserQueryJoinStepTwo />}
    </>
  );
};

export default UserQueryJoin;
