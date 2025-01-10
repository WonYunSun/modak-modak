'use client';

import useFunnel from 'hooks/useFunnel';
import React from 'react';
//단계 name 정의
const steps = ['일정명', '모임일시', '메모'];

const NewSchedulesForm = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0]);
  const handleNext = (nextStep: string) => {
    next(nextStep);
  };
  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };
  return (
    <Funnel>
      <Step name={steps[0]}>
        <div>일정 등록</div>
        <button onClick={() => handleNext(steps[1])}>다음</button>
      </Step>
      <Step name={steps[1]}>
        <div>모임일시</div>
        <button onClick={() => handlePrev(steps[0])}>이전</button>
        <button onClick={() => handleNext(steps[2])}>다음</button>
      </Step>
      <Step name={steps[2]}>
        <div>메모</div>
        <button onClick={() => handlePrev(steps[1])}>이전</button>
        <br></br>
        <button>일정 만들기</button>
      </Step>
    </Funnel>
  );
};

export default NewSchedulesForm;
