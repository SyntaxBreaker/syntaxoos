import { useFileSystemStore } from "../../store/fileSystemStore";
import FileItem from "../FileItem";
import fileIcon from "../../assets/icons/file.svg";

interface FileManagerItemsProps {
  currentDirectory: string;
}

function FileManagerItems({ currentDirectory }: FileManagerItemsProps) {
  const fileList = useFileSystemStore((state) => state.fileList);

  return (
    <div className="p-2 flex flex-row gap-4 flex-wrap content-start">
      {fileList[currentDirectory].map(({ id, fileName, src, fileType }) => (
        <FileItem
          key={id}
          fileName={fileName}
          icon={fileIcon}
          src={src}
          fileType={fileType}
        />
      ))}
    </div>
  );
}

export default FileManagerItems;
