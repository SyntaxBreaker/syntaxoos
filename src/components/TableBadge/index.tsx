interface TableBadgeProps {
  label: string;
  classes?: string;
}

function TableBadge({ label, classes = "" }: TableBadgeProps) {
  return (
    <span
      className={`px-2 py-1 bg-gray-600 text-gray-200 rounded text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

export default TableBadge;
