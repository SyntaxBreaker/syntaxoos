interface SeparatorProps {
  classes?: string;
}

function Separator({ classes = "" }: SeparatorProps) {
  return <hr className={`border-t border-gray-600 w-full ${classes}`} />;
}

export default Separator;
