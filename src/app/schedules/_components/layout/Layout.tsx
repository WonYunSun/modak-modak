import { ReactNode } from 'react';
import Button from '@components/common/Button';

type LayoutProps = {
  children: ReactNode;
  isDisabled?: boolean;
  NextBtnlabel?: string;
  onNext?: () => void;
  onPrev?: () => void;
};
const Layout = ({ children, isDisabled = false, onNext, onPrev, NextBtnlabel = '다음' }: LayoutProps) => {
  return (
    <div>
      <div className="h-[calc(100vh-10.25rem)] flex flex-col justify-between">
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
            label={NextBtnlabel}
            className="flex-[5_5_0%] full-btn"
            type="button"
            disabled={isDisabled}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
