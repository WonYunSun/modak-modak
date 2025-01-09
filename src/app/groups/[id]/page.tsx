'use client';

import PhotoList from '@app/groups/[id]/_components/PhotoList';
import PostList from '@app/groups/[id]/_components/PostList';
import ScheduleList from '@app/groups/[id]/_components/ScheduleList';
import Tabs from '@app/groups/[id]/_components/Tabs';
import GroupCard from '@components/common/GroupCard';
import Header from '@components/common/Header';
import { useTabStore } from 'stores/useTabStore';

const GroupPage = () => {
  const { activeTab } = useTabStore();

  return (
    <div className="w-full">
      <header className="fixed top-0 left-0 w-full z-30 px-5">
        <Header home={false} hasSetting={true} />
      </header>
      <div className="w-full h-[6.5rem] bg-primary-2"></div>

      <div className="w-full px-5 relative -mt-[2.75rem] z-10">
        <GroupCard
          groupInfo={{
            id: '123',
            name: '모각코!',
            description: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
            image_url: '/',
            membersNum: 7
          }}
          hasLink={false}
        />
      </div>

      {/* 탭 화면 */}
      <div className="w-full mx-auto px-5">
        <Tabs />
        <div className="mt-4">
          {activeTab === 'posts' && <PostList />}
          {activeTab === 'photos' && <PhotoList />}
          {activeTab === 'schedules' && <ScheduleList />}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
