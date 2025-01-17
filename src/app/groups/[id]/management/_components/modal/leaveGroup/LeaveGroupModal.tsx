'use client';

import { useEffect, useState } from 'react';
import AskLeaderTransition from '@app/groups/[id]/management/_components/modal/leaveGroup/AskLeaderTransition';
import LeavingAssure from '@app/groups/[id]/management/_components/modal/leaveGroup/LeavingAssure';
import LeavingSuccess from '@app/groups/[id]/management/_components/modal/leaveGroup/LeavingSuccess';

const LASTSTEP = 2;

interface LeaveGroupModalProps {
  lastStepSetter: ()=>void;
  isLeader: boolean;
}
const LeaveGroupModal = ({ lastStepSetter, isLeader }: LeaveGroupModalProps) => {
  const [leavingStep, setLeavingStep] = useState(1);
  const onNextStep = () => {
    setLeavingStep((prev) => prev + 1);
  };
  
  useEffect(()=>{
    if(leavingStep===LASTSTEP) lastStepSetter();
  }, [leavingStep])

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {leavingStep === 1 && (isLeader ? <AskLeaderTransition /> : <LeavingAssure onNextStep={onNextStep} />)}
      {leavingStep === 2 && <LeavingSuccess />}
    </div>
  );
};

export default LeaveGroupModal;
