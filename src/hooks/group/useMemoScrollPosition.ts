'use client';

import { TabType } from '@app/groups/[id]/_components/Tabs';
import useGroupStore, { ScrollYType } from '@stores/useGroupStore';
import { MutableRefObject, useEffect } from 'react';

interface MemoScrollPositionParams {
  tabScrollRef: MutableRefObject<HTMLDivElement | null>;
}
const useMemoScrollPosition = ({ tabScrollRef }: MemoScrollPositionParams) => {
  const { activeTab, scrollYPosition, setScrollYPosition } = useGroupStore();

  //탭 이동 전 스크롤 위치 메모하기
  const onTabChange = async (tab: TabType) => {
    const currentScrollY = tabScrollRef.current?.scrollTop || 0;
    setScrollYPosition({ tab, position: currentScrollY });
  };

  //탭을 이동할 때 스크롤을 메모해둔 위치로
  useEffect(() => {
    const scrollYTo = scrollYPosition[activeTab as keyof ScrollYType];
    tabScrollRef.current?.scrollTo({ top: scrollYTo, left: 0, behavior: 'instant' });
  }, [activeTab]);

  return onTabChange;
};

export default useMemoScrollPosition;
