interface TableBodyProps {
  children: React.ReactNode;
}

function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-600 bg-gray-800">{children}</tbody>
  );
}

export default TableBody;
