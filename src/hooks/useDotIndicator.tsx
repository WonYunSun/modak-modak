import React, { useState } from 'react';

interface useIndicatorParams {
  dotCount: number;
}

const useDotIndicator = ({ dotCount }: useIndicatorParams) => {
  const [dots, setDots] = useState<string[]>(
    Array.from({ length: dotCount }, (_, idx) => (idx === 0 ? 'long' : 'short'))
  );

  const DotIndicator = () => {
    return (
      <div className="flex justify-center items-center gap-3">
        {dots.map((dot, idx) =>
          dot === 'long' ? (
            <span key={dot + idx} className="w-4 h-2 rounded-full bg-[#B94600] shrink-0"></span>
          ) : (
            <span key={dot + idx} className="w-2 h-2 border rounded-full border-primary"></span>
          )
        )}
      </div>
    );
  };

  const move = (activeIndex: number): void => {
    if (activeIndex < 0) activeIndex = 0;
    setDots(
      dots.map((_, index) => {
        if (index === activeIndex) return 'long';
        return 'short';
      })
    );
  };

  return { DotIndicator, dots, move };
};

export default useDotIndicator;
