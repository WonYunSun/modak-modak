'use client';

import { Ai, Close } from '@components/icons';

interface SummaryProps {
  handleClose: (e: React.MouseEvent) => void;
  summary: string;
}

const Summary = ({ summary, handleClose }: SummaryProps) => {
  return (
    <div className="fixed inset-0 max-w-[600px] px-5 mx-auto z-50 bg-black bg-opacity-80 text-white">
      <div className="bg-white absolute bottom-[85px] left-0 right-0 w-[calc(100%-40px)] mx-auto rounded-lg h-auto p-4 flex flex-col gap-2">
        <div
          onClick={handleClose}
          className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <Close />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-1">
              <Ai className="ai-dark w-5 h-5" />
              <span className="text-sm font-semibold leading-[140%] text-gray-900">AI 요약결과</span>
            </h3>
          </div>
          <p className="text-xs font-normal leading-[140%] text-gray-500">채팅은 하루 단위로 요약돼요</p>
        </div>
        <div className="text-sm font-normal leading-[140%] text-gray-900">{summary}</div>
      </div>
    </div>
  );
};

export default Summary;
