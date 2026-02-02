import { type MouseEvent } from "react";
import fileIcon from "../../assets/icons/file.svg";
import FileManagerContextMenu from "../FileManagerContextMenu";
import { useContextMenuStore } from "../../store/contextMenuStore";
import FileItem from "../FileItem";
import { useFileSystemStore } from "../../store/fileSystemStore";
import FileManagerDirectoryList from "../FileManagerDirectoryList";

function FileManager() {
  const currentDirectory = useFileSystemStore(
    (state) => state.currentDirectory,
  );
  const fileList = useFileSystemStore((state) => state.fileList);
  const openContextMenu = useContextMenuStore((state) => state.openContextMenu);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openContextMenu(
      "fileManager",
      event.clientX - rect.left,
      event.clientY - rect.top,
    );
  };

  return (
    <div
      className="flex flex-row gap-2 h-full relative"
      onContextMenu={handleContextMenu}
    >
      <FileManagerDirectoryList currentDirectory={currentDirectory} />
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
      <FileManagerContextMenu />
    </div>
  );
}

export default FileManager;
