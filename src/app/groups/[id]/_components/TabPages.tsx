'use client';

import { forwardRef, useState } from 'react';

import PhotoList from '@app/groups/[id]/_components/PhotoList';
import PostList from '@app/groups/[id]/_components/PostList';
import ScheduleList from '@app/groups/[id]/_components/ScheduleList';
import Tabs from '@app/groups/[id]/_components/Tabs';

interface TabPagesProps {
  isScrolled: boolean;
}

const TabPages = forwardRef<HTMLDivElement, TabPagesProps>(({ isScrolled }, ref) => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="w-full mx-auto px-5 mt-8">
      <div ref={ref} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} isScrolled={isScrolled} />
      <div className="">
        {activeTab === 'posts' && <PostList setActiveTab={setActiveTab} />}
        {activeTab === 'photos' && <PhotoList />}
        {activeTab === 'schedules' && <ScheduleList />}
      </div>
    </div>
  );
});

TabPages.displayName = 'TabPages';

export default TabPages;
