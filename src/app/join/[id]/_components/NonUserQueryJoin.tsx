'use client';

import { useParams, useRouter } from 'next/navigation';
import Button from '@components/common/Button';
import { useFetchGetGroup } from '@hooks/common/useFetchGetGroup';
import QueryJoinContents from '@app/join/[id]/_components/QueryJoinContents';

const NonUserQueryJoin = () => {
  const router = useRouter();
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: groupInfo } = useFetchGetGroup(groupId);
  const onQueryJoin = () => {
    router.push(`/login?referrer=join&data=${groupId}`);
  };

  return (
    <div className="flex-grow">
      {groupInfo && (
        <QueryJoinContents groupInfo={groupInfo}>
          <Button type="button" className="full-btn" onClick={onQueryJoin} label="로그인하고 모임 가입하기" />
        </QueryJoinContents>
      )}
    </div>
  );
};

export default NonUserQueryJoin;
