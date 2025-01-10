import { Search } from '@components/icons';

const SearchBar = () => {
  const handleSearch = () => {
    return null;
  };

  return (
    <div className="w-full relative mt-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 ml-1" />
      <input
        type="text"
        placeholder="일정명으로 검색하세요..."
        className="w-full border border-solid border-gray-300 pl-12 h-10 text-base rounded-lg focus:outline-gray-700"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
