'use client';

import Button from '@components/common/Button';
import GroupCard from '@components/common/groupCard/GroupCard';
import { useFetchGetGroup } from '@hooks/useFetchGetGroup';
import { useParams } from 'next/navigation';

const NonUserQueryJoin = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const { data: groupInfo } = useFetchGetGroup(groupId);
  const onQueryJoin = async () => {};

  return (
    <>
      {groupInfo && (
        <div className="px-5">
          <h6 className="text-gray-500 mb-3">초대된 모임</h6> <GroupCard groupInfo={groupInfo} hasLink={false} />
        </div>
      )}
      <div className="px-5 w-full absolute bottom-0">
        <Button type="button" className="full-btn" onClick={onQueryJoin} label="로그인하고 모임 가입하기" />
      </div>
    </>
  );
};

export default NonUserQueryJoin;
