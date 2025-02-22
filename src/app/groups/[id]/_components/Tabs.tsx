'use client';

import useGroupStore from '@stores/useGroupStore';

const TABS: TABSElement[] = [
  {
    tabName: 'posts',
    displayName: '게시글',
  },
  {
    tabName: 'photos',
    displayName: '사진첩',
  },
  {
    tabName: 'schedules',
    displayName: '모임일정',
  },
];

export type TabType = 'posts' | 'photos' | 'schedules';
type TABSElement = { tabName: TabType; displayName: string };

interface TabsProps {
  isScrolled?: boolean;
  onTabChange: (tab:TabType) => void;
}

const Tabs = ({ isScrolled, onTabChange }: TabsProps) => {
  const { activeTab, setActiveTab } = useGroupStore();

  const onClickTab = (tab: TabType) => {
    onTabChange(activeTab as TabType);
    setActiveTab(tab);
  };

  return (
    <div className={`sticky top-12 left-0 flex cursor-pointer transition-all ${isScrolled ? 'bg-white z-20' : ''}`}>
      {TABS.map(({ tabName, displayName }) => (
        <div
          key={tabName}
          onClick={async () => {
            onClickTab(tabName);
          }}
          className={`flex-1 text-center text-base py-3 ${
            activeTab === tabName ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-700 border-b-0'
          }`}
        >
          {displayName}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
