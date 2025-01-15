'use client';

import GroupCard from '@components/common/groupCard/GroupCard';
import { useParams } from 'next/navigation';

export const GroupCardSection = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  // TODO: 그룹 정보 가져오는 쿼리 실행 후 data 전달하기
  return (
    <div className="w-full px-5 -mt-[2.75rem] z-10">
      <GroupCard
        groupInfo={{
          id: groupId,
          name: '모각코!',
          description: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
          image_url: '/icons/group-image.webp',
          membersNum: 7,
          created_at: '2025-01-14',
        }}
        hasLink={false}
      />
    </div>
  );
};
