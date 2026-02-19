interface DictionaryTableProps {
  definitions: string[];
  synonyms: string[];
}

function DictionaryTable({ definitions, synonyms }: DictionaryTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-800 shadow-sm">
      <table className="w-full text-left border-collapse bg-gray-800">
        <thead className="bg-gray-600 border-b border-gray-800">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-200 w-2/3">
              Definitions
            </th>
            <th className="px-6 py-4 font-semibold text-gray-200 w-1/3">
              Synonyms
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600 bg-gray-800">
          {definitions.map((defintion, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-gray-200 leading-relaxed">
                {defintion}
              </td>
              {index === 0 && (
                <td
                  rowSpan={definitions.length}
                  className="px-6 py-4 align-top border-l border-gray-600"
                >
                  <div className="flex flex-wrap gap-2">
                    {synonyms.length > 0 ? (
                      synonyms.map((synonym) => (
                        <span
                          key={synonym}
                          className="px-2 py-1 bg-gray-600 text-gray-200 rounded text-xs font-medium"
                        >
                          {synonym}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-200 italic text-sm">
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
  );
}

export default DictionaryTable;
