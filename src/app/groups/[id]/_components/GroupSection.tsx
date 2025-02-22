'use client';

import { useParams } from 'next/navigation';

import { useEffect, useRef } from 'react';

import Header from '@components/common/Header';

import { GroupCardSection } from '@app/groups/[id]/_components/GroupCardSection';
import TabPages from '@app/groups/[id]/_components/TabPages';

import useModalStore from '@stores/useModalStore';
import useManagementPrefetch from '@hooks/group/useManagementPrefetch';
import useObserveScrollHeader from '@hooks/group/useObserveScrollHeader';

const GroupSection = () => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  useManagementPrefetch({ groupId });

  const targetRef = useRef<HTMLDivElement | null>(null);
  const isScrolled = useObserveScrollHeader({targetRef});

  const { closeModal } = useModalStore();

  useEffect(() => {
    closeModal(); //이전에 열린 모달 닫기 처리용
  }, []);

  return (
    <div className="w-full max-w-[600px]">
      {/* 헤더 영역 */}
      <div className="w-full fixed top-0 left-0 z-30">
        <Header home={false} hasSetting={true} isScrolled={isScrolled} />
      </div>
      <div className="w-full h-[6.5rem] bg-primary-10"></div>

      <GroupCardSection />

      {/* 탭 화면 */}
      <TabPages ref={targetRef} isScrolled={isScrolled} />
    </div>
  );
};

export default GroupSection;
