'use client';

import { useState } from 'react';
import AssureTransition from '@app/groups/[id]/management/_components/modal/leaderTransition/AssureTransition';
import TransitionSuccess from '@app/groups/[id]/management/_components/modal/leaderTransition/TransitionSuccess';

const LeaderTransitionModal = () => {
  const [transitionStep, setTransitionStep] = useState(1);

  const onNextStep = () => {
    setTransitionStep((prev) => prev + 1);
  };

  return (
    <>
      {transitionStep === 1 && <AssureTransition onNextStep={onNextStep} />}
      {transitionStep === 2 && <TransitionSuccess />}
    </>
  );
};

export default LeaderTransitionModal;
