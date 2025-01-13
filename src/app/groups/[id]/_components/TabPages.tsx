'use client';

import PostList from './PostList';
import PhotoList from './PhotoList';
import ScheduleList from './ScheduleList';
import Tabs from './Tabs';
import { useTabStore } from 'stores/useTabStore';

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
