import { useAPIClientStore } from "../../store/APIClientStore";
import APIClientQueryParamRow from "../APIClientQueryParamRow";
import TableBody from "../TableBody";
import TableContainer from "../TableContainer";
import TableHeader from "../TableHeader";
import TableHeaderCell from "../TableHeaderCell";
import TableRow from "../TableRow";

function APIClientQueryParamTable() {
  const parameters = useAPIClientStore((state) => state.parameters);

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
        {parameters.map((parameter) => (
          <APIClientQueryParamRow key={parameter.id} item={parameter} />
        ))}
      </TableBody>
    </TableContainer>
  );
}

export default APIClientQueryParamTable;
