import { useState } from "react";
import fileIcon from "../../assets/file.svg";

type Directory = string;

interface FileList {
  [key: string]: {
    id: number;
    name: string;
  }[];
}

function FileManager() {
  const [currentDirectory, setCurrentDirectory] = useState<Directory>("home");
  const [directories, setDirectories] = useState<Directory[]>([
    "home",
    "downloads",
    "music",
    "pictures",
  ]);
  const [fileList, setFileList] = useState<FileList>({
    home: [],
    downloads: [],
    music: [],
    pictures: [],
  });

  return (
    <div className="flex flex-row gap-2 h-full">
      <div className="flex flex-col border-r border-border-primary py-2 pr-8">
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
          <div key={file.id} className="flex flex-col gap-2 p-2 items-center">
            <img src={fileIcon} alt={file.name} className="h-8 w-8" />
            <p className="text-white text-sm">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileManager;
