import { useEffect, useState } from 'react';

const useIOSKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleVisualViewportResize = () => {
      if (!window.visualViewport) return;

      const layoutViewportHeight = window.innerHeight;
      const visualViewportHeight = window.visualViewport.height;
      const newKeyboardHeight = Math.max(0, layoutViewportHeight - visualViewportHeight);

      setKeyboardHeight(newKeyboardHeight);
    };

    // iOS 환경인지 확인
    const userAgent = window.navigator.userAgent;
    const isIOS = /iPhone|iPad/.test(userAgent);

    // ios에서도 safari만 제외
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    // if (isIOS && isSafari) {
    //   window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    // }
    if (isIOS && isSafari) {
      setTimeout(() => {
        window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
      }, 200); // 가상 키보드가 올라올 시간을 고려해 0.2초 지연
    }

    return () => {
      if (isIOS && isSafari) {
        window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
      }
    };
  }, []);

  return keyboardHeight;
};

export default useIOSKeyboardHeight;
