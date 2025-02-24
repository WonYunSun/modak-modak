'use client';

import { MutableRefObject, useEffect, useState } from 'react';
import { TabType } from '@app/groups/[id]/_components/Tabs';
import useGroupStore from '@stores/useGroupStore';

type ScrollYType = {
  [key in TabType] : number;
};

interface MemoScrollPositionParams {
  tabScrollRef: MutableRefObject<HTMLDivElement | null>;
}
const useMemoScrollPosition = ({ tabScrollRef }: MemoScrollPositionParams) => {
  const { activeTab } = useGroupStore();
  const [scrollPosition, setScrollPosition] = useState({ posts: 0, photos: 0, schedules: 0 });

  //탭 이동 전 스크롤 위치 메모하기
  const onTabChange = (tab: TabType) => {
    const currentScrollY = tabScrollRef.current?.scrollTop || 0;
    setScrollPosition({ ...scrollPosition, [tab]: currentScrollY })
  }

  //탭을 이동할 때 스크롤을 메모해둔 위치로
  useEffect(() => {
    const scrollYTo = scrollPosition[activeTab as keyof ScrollYType];
    tabScrollRef.current?.scrollTo({ top: scrollYTo, left: 0, behavior: 'instant' });
  }, [activeTab]);

  return onTabChange;
};

export default useMemoScrollPosition;
