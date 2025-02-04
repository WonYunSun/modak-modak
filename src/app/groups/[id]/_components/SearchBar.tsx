import { useState } from 'react';

import { Cancel, Search } from '@components/icons';

interface searchProps {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: searchProps) => {
  const [inputValue, setInputValue] = useState(searchTerm || ''); // 입력 값 상태 관리

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue); // 엔터 키 입력 시 검색 실행
    }
  };

  return (
    <div className="w-full relative mt-5">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        value={inputValue}
        placeholder="일정명으로 검색하세요"
        className="w-full border border-solid border-gray-300 py-2 pl-14 pr-[3.5rem] text-base rounded-lg focus:outline-gray-700"
        onChange={(e) => setInputValue(e.target.value)} // 입력값만 변경
        onKeyDown={handleKeyDown} // 엔터 입력 시 검색 실행
      />
      {inputValue && (
        <Cancel
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => {
            setInputValue(''); // 입력 필드 초기화
            setSearchTerm(null); // 검색어 초기화
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
