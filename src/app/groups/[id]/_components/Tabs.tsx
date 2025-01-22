'use client';

import useGroupStore from '@stores/useGroupStore';

interface TabsProps {
  isScrolled?: boolean;
}

const Tabs = ({ isScrolled }: TabsProps) => {
  const { activeTab, setActiveTab } = useGroupStore();

  return (
    <div className={`sticky top-12 left-0 flex cursor-pointer transition-all ${isScrolled ? 'bg-white z-20' : ''}`}>
      {/* 게시글 탭 */}
      <div
        onClick={() => setActiveTab('posts')}
        className={`flex-1 text-center text-base py-2 ${
          activeTab === 'posts' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-700 border-b-0'
        }`}
      >
        게시글
      </div>

      {/* 사진첩 탭 */}
      <div
        onClick={() => setActiveTab('photos')}
        className={`flex-1 text-center text-base py-2 ${
          activeTab === 'photos' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-700 border-b-0'
        }`}
      >
        사진첩
      </div>

      {/* 모임일정 탭 */}
      <div
        onClick={() => setActiveTab('schedules')}
        className={`flex-1 text-center text-base py-2 ${
          activeTab === 'schedules' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-700 border-b-0'
        }`}
      >
        모임일정
      </div>
    </div>
  );
};

export default Tabs;
