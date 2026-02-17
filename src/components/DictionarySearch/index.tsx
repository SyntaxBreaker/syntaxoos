import { useState } from "react";
import { useDictionaryStore } from "../../store/dictionaryStore";

function DictionarySearch() {
  const [input, setInput] = useState("");
  const searchWord = useDictionaryStore((state) => state.searchWord);
  const isLoading = useDictionaryStore((state) => state.isLoading);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchWord(input);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter a word..."
        className="flex-1 p-2 border border-gray-600 rounded-md shadow-sm outline-none text-gray-200"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-600"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default DictionarySearch;
