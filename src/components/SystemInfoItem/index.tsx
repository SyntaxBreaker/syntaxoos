interface SystemInfoItemProps {
  label: string;
}

function SystemInfoItem({ label }: SystemInfoItemProps) {
  return <p className="text-xs">{label}</p>;
}

export default SystemInfoItem;
