'use client';

import { useState } from 'react';

interface ToggleBoxProps {
  isChecked: boolean;
}
const ToggleBox = ({ isChecked }: ToggleBoxProps) => {
  const [istoggled, setIsToggled] = useState(isChecked);

  const handleToggle = () => {
    setIsToggled(prev=>!prev);
  };

  return (
    <div data-cy="setting_toggle" className="toggle-btn">
      <label className="switch">
        <input type="checkbox" className="hidden" checked={istoggled} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleBox;
