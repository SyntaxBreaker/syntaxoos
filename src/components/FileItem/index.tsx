import { WINDOW_ID } from "../../apps";
import { useAudioStore } from "../../store/audioStore";
import { useImageStore } from "../../store/imageStore";
import { useTextStore } from "../../store/textStore";
import { useWindowsStore } from "../../store/windowsStore";
import type { FileType } from "../../types";

interface FileItemProps {
  icon: string;
  name: string;
  src: string;
  fileType: FileType;
}

function FileItem({ icon, name, src, fileType }: FileItemProps) {
  const setImage = useImageStore((state) => state.setImage);
  const setDocument = useTextStore((state) => state.setDocument);
  const openWindow = useWindowsStore((state) => state.openWindow);
  const setAudio = useAudioStore((state) => state.setAudio);

  const handleFileOpen = () => {
    if (fileType === "image") {
      setImage(src, name);
      openWindow(WINDOW_ID.IMAGE_VIEWER);
    } else if (fileType === "text" || fileType === "markdown") {
      const fileFormat = name.split(".")[1];
      setDocument(src, fileFormat);
      openWindow(WINDOW_ID.TEXT_READER);
    } else if (fileType === "audio") {
      setAudio(src, name);
      openWindow(WINDOW_ID.MUSIC_PLAYER);
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
