import { useImageStore } from "../../store/imageStore";
import { useWindowsStore } from "../../store/windowsStore";

interface FileItemProps {
  icon: string;
  name: string;
  imgSrc?: string;
}

function FileItem({ icon, name, imgSrc }: FileItemProps) {
  const setImageSrc = useImageStore((state) => state.setImageSrc);
  const openWindow = useWindowsStore((state) => state.openWindow);

  const handleFileOpen = () => {
    if (imgSrc) {
      setImageSrc(imgSrc, name);
      openWindow(2);
    }
  };

  return (
    <button
      className="flex flex-col gap-2 p-2 items-center cursor-pointer"
      onClick={handleFileOpen}
    >
      <img src={icon} alt={name} className="h-8 w-8" />
      <p className="text-white text-sm">{name}</p>
    </button>
  );
}

export default FileItem;
