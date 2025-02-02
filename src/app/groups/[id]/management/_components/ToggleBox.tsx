'use client';

import { useState } from 'react';

interface ToggleBoxProps {
  isChecked: boolean;
}
const ToggleBox = ({ isChecked }: ToggleBoxProps) => {
  //여기서 useState를 쓰지 말고 tanstack Query를 사용해야 함
  const [istoggled, setIsToggled] = useState(isChecked);

  const handleToggle = () => {
    setIsToggled(prev=>!prev);
  };

  //로딩중에는 일단 아무것도 보이지 말아보자

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
