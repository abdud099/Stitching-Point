"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  // Handle search when user submits the form
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center bg-gray-100 rounded-md px-2 py-2 w-full max-w-xs sm:max-w-md md:max-w-lg"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value); // Calls onSearch whenever user types
        }}
        className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500 focus:placeholder-gray-400"
      />
      <button
        type="submit"
        className="ml-3 right-3 text-gray-600 hover:text-black transition"
        aria-label="Search"
      >
        <FaSearch size={16} />
      </button>
    </form>
  );
};

export default SearchBar;
