interface TableContainerProps {
  children: React.ReactNode;
}

function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-800 shadow-sm">
      <table className="w-full text-left border-collapse bg-gray-800">
        {children}
      </table>
    </div>
  );
}

export default TableContainer;
