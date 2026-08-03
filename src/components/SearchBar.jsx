import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search a GitHub organization…"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 transition-colors">
        Search
      </button>
    </form>
  );
}
