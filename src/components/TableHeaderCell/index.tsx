interface TableHeaderCellProps {
  children: React.ReactNode;
  classes?: string;
}

function TableHeaderCell({ children, classes = "" }: TableHeaderCellProps) {
  return (
    <th className={`p-4 bg-gray-600 border-b-1 border-gray-500 ${classes}`}>
      {children}
    </th>
  );
}

export default TableHeaderCell;
