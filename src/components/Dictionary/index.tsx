import { useState } from "react";
import { useDictionaryStore } from "../../store/dictionaryStore";
import DictionaryTable from "../DictionaryTable";

function Dictionary() {
  const [input, setInput] = useState("");
  const wordDetails = useDictionaryStore((state) => state.wordDetails);
  const searchWord = useDictionaryStore((state) => state.searchWord);
  const isLoading = useDictionaryStore((state) => state.isLoading);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWord(input);
  };

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a word..."
          className="flex-1 p-2 border border-gray-600 rounded-md shadow-sm outline-none text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {wordDetails && (
        <DictionaryTable
          definitions={wordDetails.meanings.definitions}
          synonyms={wordDetails.meanings.synonyms}
        />
      )}
    </div>
  );
}

export default Dictionary;
