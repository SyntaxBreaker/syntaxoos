interface SystemInfoItemProps {
  label: string;
}

function SystemInfoItem({ label }: SystemInfoItemProps) {
  return <li className="text-xs">{label}</li>;
}

export default SystemInfoItem;
