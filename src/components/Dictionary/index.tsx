import { useState } from "react";
import { useDictionaryStore } from "../../store/dictionaryStore";

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
        <div className="w-full overflow-x-auto rounded-lg border border-gray-800 shadow-sm">
          <table className="w-full text-left border-collapse bg-gray-800">
            <thead className="bg-gray-700 border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-white w-2/3">
                  Definitions
                </th>
                <th className="px-6 py-4 font-semibold text-white w-1/3">
                  Synonyms
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600 bg-gray-800">
              {wordDetails.meanings.definitions.map((defintion, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-white leading-relaxed">
                    {defintion}
                  </td>
                  {index === 0 && (
                    <td
                      rowSpan={wordDetails.meanings.definitions.length}
                      className="px-6 py-4 align-top border-l border-gray-600"
                    >
                      <div className="flex flex-wrap gap-2">
                        {wordDetails.meanings.synonyms.length > 0 ? (
                          wordDetails.meanings.synonyms.map((synonym) => (
                            <span
                              key={synonym}
                              className="px-2 py-1 bg-gray-600 text-white rounded text-xs font-medium"
                            >
                              {synonym}
                            </span>
                          ))
                        ) : (
                          <span className="text-white italic text-sm">
                            No synonyms
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
