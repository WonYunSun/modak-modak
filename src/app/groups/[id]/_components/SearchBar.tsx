import { Cancel, Search } from '@components/icons';

interface searchProps {
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchBar = ({ search, setSearch }: searchProps) => {
  return (
    <div className="w-full relative mt-6">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        value={search || ''}
        placeholder="일정명으로 검색하세요..."
        className="w-full border border-solid border-gray-300 py-2 pl-14 pr-[3.5rem] text-base rounded-lg focus:outline-gray-700"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <Cancel
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => {
            setSearch('');
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
