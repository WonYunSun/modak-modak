'use client';

import { useTabStore } from 'stores/useTabStore';

const Tabs = () => {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="flex">
      {/* 게시글 탭 */}
      <button
        onClick={() => setActiveTab('posts')}
        className={`flex-1 text-center p-4 pb-3 text-base ${
          activeTab === 'posts' ? 'border-b-2 border-gray-900 font-bold' : 'text-gray-700 border-b-0'
        }`}
      >
        게시글
      </button>

      {/* 사진첩 탭 */}
      <button
        onClick={() => setActiveTab('photos')}
        className={`flex-1 text-center p-4 pb-3 text-base ${
          activeTab === 'photos' ? 'border-b-2 border-gray-900 font-bold' : 'text-gray-700 border-b-0'
        }`}
      >
        사진첩
      </button>

      {/* 모임일정 탭 */}
      <button
        onClick={() => setActiveTab('schedules')}
        className={`flex-1 text-center p-4 pb-3 text-base ${
          activeTab === 'schedules' ? 'border-b-2 border-gray-900 font-bold' : 'text-gray-700 border-b-0'
        }`}
      >
        모임일정
      </button>
    </div>
  );
};

export default Tabs;
