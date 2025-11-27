import { useImageStore } from "../../store/imageStore";
import { useTextStore } from "../../store/textStore";
import { useWindowsStore } from "../../store/windowsStore";

interface FileItemProps {
  icon: string;
  name: string;
  imgSrc?: string;
  content?: string;
}

function FileItem({ icon, name, imgSrc, content }: FileItemProps) {
  const setImage = useImageStore((state) => state.setImage);
  const setContent = useTextStore((state) => state.setContent);
  const openWindow = useWindowsStore((state) => state.openWindow);

  const handleFileOpen = () => {
    if (imgSrc) {
      setImage(imgSrc, name);
      openWindow(2);
    } else if (content) {
      setContent(content);
      openWindow(3);
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
