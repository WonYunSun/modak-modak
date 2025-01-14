import { useState } from 'react';
import AssureTransition from './AssureTransition';
import TransitionSuccess from './TransitionSuccess';

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
