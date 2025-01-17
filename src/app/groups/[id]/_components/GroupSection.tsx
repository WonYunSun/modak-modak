'use client';

import { usePathname } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

import Header from '@components/common/Header';

import { GroupCardSection } from '@app/groups/[id]/_components/GroupCardSection';
import TabPages from '@app/groups/[id]/_components/TabPages';

import useHeaderStore from '@stores/useHeaderStore';

const GroupSection = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const pathName = usePathname();

  const { reset } = useHeaderStore();

  useEffect(() => {
    const targetInstanceRef = targetRef.current;

    const options = {
      rootMargin: '-48px 0px 0px 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      setIsScrolled(!entries[0].isIntersecting);
    }, options);

    if (targetInstanceRef) {
      observer.observe(targetInstanceRef);
    }

    return () => {
      if (targetInstanceRef) {
        observer.unobserve(targetInstanceRef);
      }

      if (pathName !== '/') reset();
    };
  }, []);

  return (
    <div className="w-full">
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
