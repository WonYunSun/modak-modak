'use client';
import { ReactElement, ReactNode, useState } from 'react';

type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: Array<ReactElement<StepProps>>;
};

const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  //step 컴포넌트 : 개별 step의 name을 받고, children을 출력할 것임.
  const Step = (props: StepProps) => {
    return <>{props.children}</>;
  };

  //Funnel 컴포넌트에서는, 현재 step상태와 일치하는 step children을 보여주도록 할 것임
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);
    return targetStep;
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

  return { Funnel, Step, next, prev, step };
};

export default useFunnel;
