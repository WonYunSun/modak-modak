'use client';

import useHeaderStore from '@stores/useHeaderStore';
import { usePathname } from 'next/navigation';
import { MutableRefObject, useEffect, useState } from 'react';

interface ObserveScrollHeader {
  targetRef: MutableRefObject<HTMLDivElement | null>
}
const useObserveScrollHeader = ({ targetRef }: ObserveScrollHeader) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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

  return isScrolled;
};

export default useObserveScrollHeader;
