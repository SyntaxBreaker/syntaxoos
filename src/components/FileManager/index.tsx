import { type MouseEvent } from "react";
import { useState } from "react";
import fileIcon from "../../assets/file.svg";
import FileManagerContextMenu from "../FileManagerContextMenu";
import { useContextMenuStore } from "../../store/contextMenuStore";
import FileItem from "../FileItem";

type Directory = string;

interface FileList {
  [key: string]: {
    id: number;
    name: string;
  }[];
}

const INITIAL_FILE_LIST: FileList = {
  home: [
    {
      id: 0,
      name: "password.txt",
    },
    {
      id: 1,
      name: "TODO.md",
    },
  ],
  downloads: [
    {
      id: 2,
      name: "install_me_totally_safe.sh",
    },
    {
      id: 3,
      name: "memes_backup.tar.gz",
    },
  ],
  music: [
    {
      id: 4,
      name: "random_noises_at_3am.wav",
    },
  ],
  pictures: [
    {
      id: 5,
      name: "never_send_anyone.png",
    },
    {
      id: 6,
      name: "meme_that_made_me_laugh.png",
    },
  ],
};

function FileManager() {
  const [currentDirectory, setCurrentDirectory] = useState<Directory>("home");
  const [directories] = useState<Directory[]>([
    "home",
    "downloads",
    "music",
    "pictures",
  ]);
  const [fileList] = useState<FileList>(INITIAL_FILE_LIST);
  const openContextMenu = useContextMenuStore((state) => state.openContextMenu);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    openContextMenu(
      "fileManager",
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  };

  return (
    <div
      className="flex flex-row gap-2 h-full relative"
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-col border-r border-border-primary py-2 pr-16">
        <h2 className="text-white text-sm font-extrabold">Places</h2>
        {directories.map((directory) => (
          <button
            key={directory}
            className="text-white text-sm cursor-pointer p-1 self-start capitalize"
            onClick={() => setCurrentDirectory(directory)}
          >
            {directory}
          </button>
        ))}
      </div>
      <div className="p-2 flex flex-row gap-4 flex-wrap content-start">
        {fileList[currentDirectory].map((file) => (
          <FileItem key={file.id} name={file.name} icon={fileIcon} />
        ))}
      </div>
      <FileManagerContextMenu />
    </div>
  );
}

export default FileManager;
