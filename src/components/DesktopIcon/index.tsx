interface DesktopIconProps {
  name: string;
  iconSrc: string;
  onClick: () => void;
}

function DesktopIcon({ name, iconSrc, onClick }: DesktopIconProps) {
  return (
    <div
      className="flex flex-col gap-2 w-16 flex-wrap cursor-pointer"
      onClick={onClick}
    >
      <img src={iconSrc} alt={name} />
      <p className="text-white text-center">{name}</p>
    </div>
  );
}

export default DesktopIcon;
