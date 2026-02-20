import TableBadge from "../TableBadge";
import TableBody from "../TableBody";
import TableCell from "../TableCell";
import TableContainer from "../TableContainer";
import TableHeader from "../TableHeader";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";

interface DictionaryTableProps {
  definitions: string[];
  synonyms: string[];
}

function DictionaryTable({ definitions, synonyms }: DictionaryTableProps) {
  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell classes="w-2/3 border-r">
            Definitions
          </TableHeaderCell>
          <TableHeaderCell classes="w-1/3">Synonyms</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {definitions.map((definition, index) => (
          <TableRow key={index}>
            <TableCell>{definition}</TableCell>
            {index === 0 && (
              <TableCell
                rowSpan={definition.length}
                classes="align-top border-l border-gray-400"
              >
                <div className="flex flex-wrap gap-2">
                  {synonyms.length > 0 ? (
                    synonyms.map((synonym, index) => (
                      <TableBadge key={index} label={synonym} />
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-sm"></span>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}

export default DictionaryTable;
