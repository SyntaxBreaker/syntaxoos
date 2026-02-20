interface TableBadgeProps {
  label: string;
}

function TableBadge({ label }: TableBadgeProps) {
  return (
    <span className="px-2 py-1 bg-gray-600 text-gray-200 rounded text-xs font-medium">
      {label}
    </span>
  );
}

export default TableBadge;
