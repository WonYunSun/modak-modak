import { useEffect, useState } from 'react';

const useIOSKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleVisualViewportResize = () => {
      if (!window.visualViewport) return;

      const layoutViewportHeight = window.innerHeight;
      const visualViewportHeight = window.visualViewport.height;
      const newKeyboardHeight = Math.max(0, layoutViewportHeight - visualViewportHeight);

      alert(`키보드 높이는 ${newKeyboardHeight} 입니다`);
      setKeyboardHeight(newKeyboardHeight);
    };

    // iOS 환경인지 확인
    const isIOS = /iPhone|iPad/.test(window.navigator.userAgent);

    if (isIOS) {
      window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    }

    return () => {
      if (isIOS) {
        window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
      }
    };
  }, []);

  return keyboardHeight;
};

export default useIOSKeyboardHeight;
