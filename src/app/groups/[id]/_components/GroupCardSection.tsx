'use client';

import { useParams } from 'next/navigation';

import GroupCard from '@components/common/groupCard/GroupCard';

import { useFetchGetGroup } from '@hooks/useFetchGetGroup';
import Loading from '@components/common/Spinner';

export const GroupCardSection = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isError } = useFetchGetGroup(groupId);

  if (isPending) return null;

  if (isError || !data) {
    <span>모임 정보를 불러오는데 문제가 발생했습니다.</span>;
  }

  return (
    <div className="w-full px-5 -mt-[2.75rem] z-10">
      <GroupCard groupInfo={data!} hasLink={false} />
    </div>
  );
};
