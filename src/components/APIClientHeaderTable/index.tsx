import { useAPIClientStore } from "../../store/APIClientStore";
import APIClientHeaderRow from "../APIClientHeaderRow";
import TableBody from "../TableBody";
import TableContainer from "../TableContainer";
import TableHeader from "../TableHeader";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";

function APIClientHeaderTable() {
  const headers = useAPIClientStore((state) => state.headers);

  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell classes="w-1/3 border-r">Key</TableHeaderCell>
          <TableHeaderCell classes="w-1/3 border-r">Value</TableHeaderCell>
          <TableHeaderCell classes="w-1/3">Options</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {headers.map((header) => (
          <APIClientHeaderRow key={header.id} item={header} />
        ))}
      </TableBody>
    </TableContainer>
  );
}

export default APIClientHeaderTable;
