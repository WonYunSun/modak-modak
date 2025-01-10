import Button from '@components/common/Button';
import FunnelHeader from '@components/common/FunnelHeader';

import React, { ReactNode } from 'react';
type LayoutProps = {
  children: ReactNode;
  isDisabled: boolean;
  onNext?: () => void;
  onPrev?: () => void;
};
const Layout = ({ children, isDisabled, onNext, onPrev }: LayoutProps) => {
  return (
    <>
      <FunnelHeader label="일정 만들기" />
      <div>
        {children}

        <div className="flex gap-[8px]">
          <Button
            label="이전"
            className="flex-[2_2_0%] full-white-btn"
            type="button"
            disabled={false}
            onClick={onPrev}
          />
          <Button
            label="다음"
            className="flex-[5_5_0%] full-btn"
            type="button"
            disabled={isDisabled}
            onClick={onNext}
          />
        </div>
      </div>
    </>
  );
};

export default Layout;
