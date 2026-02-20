interface TableHeaderProps {
  children: React.ReactNode;
  classes?: string;
}

function TableHeader({ children, classes = "" }: TableHeaderProps) {
  return (
    <thead className={`p-4 font-semibold text-gray-200 ${classes}`}>
      {children}
    </thead>
  );
}

export default TableHeader;
