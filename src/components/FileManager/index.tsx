import { type MouseEvent } from "react";
import FileManagerContextMenu from "../FileManagerContextMenu";
import { useContextMenuStore } from "../../store/contextMenuStore";
import { useFileSystemStore } from "../../store/fileSystemStore";
import FileManagerDirectoryList from "../FileManagerDirectoryList";
import FileManagerItems from "../FileManagerItems";

function FileManager() {
  const currentDirectory = useFileSystemStore(
    (state) => state.currentDirectory,
  );
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
      <FileManagerItems currentDirectory={currentDirectory} />
      <FileManagerContextMenu />
    </div>
  );
}

export default FileManager;
