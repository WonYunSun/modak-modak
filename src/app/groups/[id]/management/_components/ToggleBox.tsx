'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import useToggleNotification from '@hooks/management/useToggleNotification';

interface ToggleBoxProps {
  receiveNotification: boolean;
}
const ToggleBox = ({ receiveNotification }: ToggleBoxProps) => {
  const { id } = useParams();
  const groupId = Array.isArray(id) ? id[0] : id;

  const toggleSubscription = useToggleNotification({ groupId });
  const [isProcessing, setIsProcessing] = useState(false);

  const processTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const processCompliter = useCallback(() => {
    processTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current);
      }
    };
  }, []);

  if (receiveNotification === undefined) return;

  const handleToggle = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    toggleSubscription(!receiveNotification);
    processCompliter();
  };

  return (
    <div data-cy="setting_toggle" className="toggle-btn">
      <label className="switch">
        <input type="checkbox" className="hidden" checked={receiveNotification} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleBox;
