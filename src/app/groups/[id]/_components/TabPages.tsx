'use client';

import { useState } from 'react';

import Tabs from '@app/groups/[id]/_components/Tabs';
import PhotoList from '@app/groups/[id]/_components/PhotoList';
import PostList from '@app/groups/[id]/_components/PostList';
import ScheduleList from '@app/groups/[id]/_components/ScheduleList';

const TabPages = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="w-full mx-auto px-5 mt-8">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="">
        {activeTab === 'posts' && <PostList setActiveTab={setActiveTab} />}
        {activeTab === 'photos' && <PhotoList />}
        {activeTab === 'schedules' && <ScheduleList />}
      </div>
    </div>
  );
};

export default TabPages;
