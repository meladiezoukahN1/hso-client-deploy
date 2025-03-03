import React from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  query: string;
  onSearch: (value: string) => void;
}

function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <div className="w-96 h-10 bg-gray-200 rounded-full mx-auto mt-4 flex items-center px-4">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        dir="rtl"
        className="w-full bg-transparent outline-none text-gray-700 text-lg"
      />
      <IoSearch className="text-gray-500 text-2xl" />
    </div>
  );
}

export default SearchBar;
