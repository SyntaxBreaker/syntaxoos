interface FileItemProps {
  icon: string;
  name: string;
}

function FileItem({ icon, name }: FileItemProps) {
  return (
    <button className="flex flex-col gap-2 p-2 items-center cursor-pointer">
      <img src={icon} alt={name} className="h-8 w-8" />
      <p className="text-white text-sm">{name}</p>
    </button>
  );
}

export default FileItem;
