'use client';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import FunnelHeader from '@components/common/FunnelHeader';
import useDotIndicator from '@hooks/useDotIndicator';

type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: Array<ReactElement<StepProps>>;
  headerLabel: string;
};

const useFunnel = (defaultStep: string, length: number) => {
  const [step, setStep] = useState(defaultStep);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { DotIndicator, move } = useDotIndicator({ dotCount: length });

  useEffect(() => {
    move(currentIndex);
  }, [currentIndex]);

  //새로고침 또는 페이지 떠날 때때 알럿
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  //step 컴포넌트 : 개별 step의 name을 받고, children을 출력할 것임.
  const Step = (props: StepProps) => {
    return <>{props.children}</>;
  };

  //Funnel 컴포넌트에서는, 현재 step상태와 일치하는 step children을 보여주도록 할 것임
  const Funnel = ({ children, headerLabel }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return (
      <div className="reactive h-dvh flex flex-col">
        <FunnelHeader label={headerLabel} />
        <div className="inner flex flex-col flex-grow">
          <div className="flex gap-2 pt-[2.25rem] pb-[2.5rem]">
            <DotIndicator />
          </div>
          <div className="flex-grow">{targetStep}</div>
        </div>
      </div>
    );
  };

  //step 상태 업데이트 함수
  const updateStep = (step: string): void => {
    setStep(step);
  };

  //다음으로
  const next = (nextStep: string): void => {
    updateStep(nextStep);
    setCurrentIndex((prev) => prev + 1);
  };

  // 이전으로
  const prev = (prevStep: string): void => {
    updateStep(prevStep);
    setCurrentIndex((prev) => prev - 1);
  };

  return { Funnel, Step, next, prev, currentStep: step };
};

export default useFunnel;
