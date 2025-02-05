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
    <div className="flex flex-col h-full ">
      <div className="flex-grow">{children}</div>
      <div className="flex gap-2 w-full pb-[12px]">
        <Button label="이전" className="flex-[2_2_0%] full-white-btn" type="button" disabled={false} onClick={onPrev} />
        <Button
          label={NextBtnlabel}
          className="flex-[5_5_0%] full-btn"
          type="button"
          disabled={isDisabled}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default Layout;
