import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchText);
    onSearch(searchText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
}
