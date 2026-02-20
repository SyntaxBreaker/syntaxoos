interface TableRowProps {
  children: React.ReactNode;
}

function TableRow({ children }: TableRowProps) {
  return <tr className="group">{children}</tr>;
}

export default TableRow;
