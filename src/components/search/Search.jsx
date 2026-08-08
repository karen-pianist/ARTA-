import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Paintings, Artists, Styles"
      className="h-11 w-full rounded-full border border-gray-300 bg-white px-5 text-[16px] text-black outline-none transition-colors duration-500 placeholder:text-gray-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
    />
  );
};

export default Search;