'use client';

import Tabs from './Tabs';
import PostList from './PostList';
import PhotoList from './PhotoList';
import ScheduleList from './ScheduleList';
import { useState } from 'react';

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
