'use client';

import { useParams } from 'next/navigation';

import GroupCard from '@components/common/groupCard/GroupCard';

import { useFetchGetGroupInfo } from '@hooks/group/useFetchGroup';

export const GroupCardSection = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { data, isPending, isError } = useFetchGetGroupInfo(groupId);

  if (isPending) return <p>로딩 중...</p>;

  if (isError || !data) {
    <span>모임 정보를 불러오는데 문제가 발생했습니다.</span>;
  }

  return (
    <div className="w-full px-5 -mt-[2.75rem] z-10">
      <GroupCard groupInfo={data!} hasLink={false} />
    </div>
  );
};
