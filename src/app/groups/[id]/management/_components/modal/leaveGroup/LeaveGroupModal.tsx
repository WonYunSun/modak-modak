import { useState } from 'react';
import AskLeaderTransition from './AskLeaderTransition';
import LeavingAssure from './LeavingAssure';
import LeavingSuccess from './LeavingSuccess';

interface LeaveGroupModalProps {
  isLeader: boolean;
}
const LeaveGroupModal = ({ isLeader }: LeaveGroupModalProps) => {
  const [leavingStep, setLeavingStep] = useState(1);
  const onNextStep = () => {
    setLeavingStep((prev) => prev + 1);
  };

  return (
    <div className="w-full px-5 flex flex-col items-center">
      {leavingStep === 1 && (isLeader ? <AskLeaderTransition /> : <LeavingAssure onNextStep={onNextStep} />)}
      {leavingStep === 2 && <LeavingSuccess/>}
    </div>
  );
};

export default LeaveGroupModal;
