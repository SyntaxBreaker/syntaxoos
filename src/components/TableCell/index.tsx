interface TableCellProps {
  children: React.ReactNode;
  rowSpan?: number;
  classes?: string;
}

function TableCell({ children, rowSpan = 1, classes = "" }: TableCellProps) {
  return (
    <td
      rowSpan={rowSpan}
      className={`p-4 text-gray-200 leading-relaxed ${classes}`}
    >
      {children}
    </td>
  );
}

export default TableCell;
