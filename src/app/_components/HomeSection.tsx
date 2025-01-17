'use client';

import { useEffect, useRef, useState } from 'react';

import HomeContents from '@app/_components/HomeContents';

import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { Plus } from '@components/icons';

const HomeSection = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetInstanceRef = targetRef.current;

    const options = {
      rootMargin: '-48px 0px 0px 0px',
      threshold: [0, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.top <= 48) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, options);

    if (targetInstanceRef) {
      observer.observe(targetInstanceRef);
    }

    return () => {
      if (targetInstanceRef) {
        observer.unobserve(targetInstanceRef);
      }
    };
  }, []);

  return (
    <div className="bg-primary-10">
      <Header hasSetting={false} home={true} isScrolled={isScrolled} />
      <HomeContents ref={targetRef} />
      <Button label={'모임 만들기'} className={'floating-btn'} type={'button'}>
        <Plus className={'w-4 h-4'} active={true} />
      </Button>
    </div>
  );
};

export default HomeSection;
