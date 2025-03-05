'use client';

import { MutableRefObject, useEffect, useState } from 'react';
import { TabType } from '@app/groups/[id]/_components/Tabs';
import useGroupStore from '@stores/useGroupStore';

type ScrollYType = {
  [key in TabType]: number;
};

interface MemoScrollPositionParams {
  tabScrollRef: MutableRefObject<HTMLDivElement | null>;
}
const useMemoScrollPosition = ({ tabScrollRef }: MemoScrollPositionParams) => {
  const { activeTab } = useGroupStore();
  const [scrollPosition, setScrollPosition] = useState<ScrollYType>({ posts: 0, photos: 0, schedules: 0 });

  //탭 이동 전 스크롤 위치 메모하기
  const onTabChange = (tab: TabType) => {
    const currentScrollY = tabScrollRef.current?.scrollTop || 0;
    const tabs = Object.keys(scrollPosition) as Array<keyof ScrollYType>;

    if (currentScrollY >= 180) {
      const newScrollY = { ...scrollPosition };
      tabs.forEach((curTab) => {
        if (scrollPosition[curTab] < 180) newScrollY[curTab] = 180;
        if (curTab === tab) newScrollY[curTab] = currentScrollY;
      });
      setScrollPosition(newScrollY);
    }

    if (currentScrollY <= 180) {
      const otherTabs = tabs.filter((curTab)=>curTab!==tab);
      const isTabSticky = otherTabs.some((curTab) => scrollPosition[curTab] > 180);
      if (isTabSticky) {
        setScrollPosition({ ...scrollPosition, [tab]: 180 });
      }
      if (!isTabSticky) {
        setScrollPosition({ posts: 0, photos: 0, schedules: 0 });
      }
    }
  };

  //탭을 이동할 때 스크롤을 메모해둔 위치로
  useEffect(() => {
    const scrollYTo = scrollPosition[activeTab as keyof ScrollYType];
    tabScrollRef.current?.scrollTo({ top: scrollYTo, left: 0, behavior: 'instant' });
  }, [activeTab]);

  return onTabChange;
};

export default useMemoScrollPosition;
