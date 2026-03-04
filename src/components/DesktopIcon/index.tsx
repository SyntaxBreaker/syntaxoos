interface DesktopIconProps {
  name: string;
  iconSrc: string;
  onClick: () => void;
}

function DesktopIcon({ name, iconSrc, onClick }: DesktopIconProps) {
  return (
    <button
      className="flex flex-col gap-2 w-24 flex-wrap cursor-pointer"
      onClick={onClick}
    >
      <img src={iconSrc} alt={name} className="h-8 w-8 m-auto" />
      <p className="text-gray-200 text-center">{name}</p>
    </button>
  );
}

export default DesktopIcon;
