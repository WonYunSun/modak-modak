'use client';

import { forwardRef, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Tabs from '@app/groups/[id]/_components/Tabs';
import PhotoList from '@app/groups/[id]/_components/PhotoList';
import PostList from '@app/groups/[id]/_components/PostList';
import ScheduleCardList from '@app/groups/[id]/_components/ScheduleCardList';
import { CircleOk } from '@components/icons';

import useGroupStore from '@stores/useGroupStore';
import useSmallAlert from '@hooks/common/useSmallAlert';

interface TabPagesProps {
  isScrolled: boolean;
}

const TabPages = forwardRef<HTMLDivElement, TabPagesProps>(({ isScrolled }, ref) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const { SmallAlert, openAlert: openDeleteAlert } = useSmallAlert();
  const { activeTab, previousGroupId, setPreviousGroupId, resetActiveTab } = useGroupStore();

  useEffect(() => {
    if (groupId) {
      // 현재 groupId와 저장된 currentGroupId가 다를 경우 초기화
      if (previousGroupId !== groupId) {
        resetActiveTab(); // 상태 초기화
        setPreviousGroupId(groupId); // 현재 그룹 ID 저장
      }
    }
  }, []);

  return (
    <div className="w-full mx-auto px-5 mt-8">
      <div ref={ref} />
      <Tabs isScrolled={isScrolled} />
      <div>
        {activeTab === 'posts' && <PostList openDeleteAlert={openDeleteAlert} />}
        {activeTab === 'photos' && <PhotoList />}
        {activeTab === 'schedules' && <ScheduleCardList />}
      </div>

      <SmallAlert>
        <CircleOk /> {'게시글이 삭제되었습니다!'}
      </SmallAlert>
    </div>
  );
});

TabPages.displayName = 'TabPages';

export default TabPages;
