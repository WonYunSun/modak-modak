'use client';

import { useTabStore } from 'stores/useTabStore';

import Tabs from './Tabs';
import PostList from './PostList';
import PhotoList from './PhotoList';
import ScheduleList from './ScheduleList';

const TabPages = () => {
  const { activeTab } = useTabStore();

  return (
    <div className="w-full mx-auto px-5 mt-8">
      <Tabs />
      <div className="">
        {activeTab === 'posts' && <PostList />}
        {activeTab === 'photos' && <PhotoList />}
        {activeTab === 'schedules' && <ScheduleList />}
      </div>
    </div>
  );
};

export default TabPages;
