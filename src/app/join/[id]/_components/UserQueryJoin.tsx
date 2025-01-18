'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  const [joinStep, setJoinStep] = useState(1);

  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: joinStateData, isPending, isError } = useIsAlreadyJoin({ groupId });

  const onQueryJoin = async () => {
    await queryJoinGroup({ groupId, userId });
    setJoinStep(2);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className="px-5 w-full absolute bottom-0">
      {joinStep === 1 && joinStateData && (
        <>
          {joinStateData === 'joinable' ? (
            <button type="button" className="full-btn" onClick={onQueryJoin}>
              {JOINSTATE[joinStateData]}
            </button>
          ) : (
            <button type="button" className="full-btn disabled-btn" disabled={true}>
              {JOINSTATE[joinStateData]}
            </button>
          )}
        </>
      )}
      {joinStep === 2 && (
        <Link href={'/'}>
          <button type="button" className="full-btn">
            홈페이지로 가기
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserQueryJoin;
