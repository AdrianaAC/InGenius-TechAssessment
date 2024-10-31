import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Search for courses..."
        value={query}
        onChange={handleSearch}
        className="searchBar"
      />
    </div>
  );
};

export default SearchBar;
