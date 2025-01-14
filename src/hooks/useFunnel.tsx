'use client';
import { ReactElement, ReactNode, useState } from 'react';
import FunnelHeader from '@components/common/FunnelHeader';

type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: Array<ReactElement<StepProps>>;
  headerLabel: string;
};

const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  //step 컴포넌트 : 개별 step의 name을 받고, children을 출력할 것임.
  const Step = (props: StepProps) => {
    return <>{props.children}</>;
  };

  //Funnel 컴포넌트에서는, 현재 step상태와 일치하는 step children을 보여주도록 할 것임
  const Funnel = ({ children, headerLabel }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);
    return (
      <div>
        <FunnelHeader label={headerLabel} />
        <div className="flex gap-2 pt-[2.25rem] pb-[2.5rem]">
          {children.map((child, index) => (
            <div
              key={index}
              className={`rounded-full ${child.props.name === step ? 'w-4 h-2 bg-primary' : 'w-2 h-2 border border-primary'}`}
            />
          ))}
        </div>
        {targetStep}
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
  };

  // 이전으로
  const prev = (prevStep: string): void => {
    updateStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep: step };
};

export default useFunnel;
