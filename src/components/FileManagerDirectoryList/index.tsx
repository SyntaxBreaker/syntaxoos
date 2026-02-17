import { useFileSystemStore } from "../../store/fileSystemStore";

interface FileManagerDirectoryListProps {
  currentDirectory: string;
}

function FileManagerDirectoryList({
  currentDirectory,
}: FileManagerDirectoryListProps) {
  const directories = useFileSystemStore((state) => state.directories);
  const setCurrentDirectory = useFileSystemStore(
    (state) => state.setCurrentDirectory,
  );

  return (
    <div className="flex flex-col border-r border-border-primary py-2 pr-2 gap-1 w-[156px]">
      <h2 className="text-gray-200 text-sm font-extrabold">Places</h2>
      {directories.map((directory) => (
        <button
          key={directory}
          className={`text-gray-200 text-sm cursor-pointer px-2 py-1 capitalize w-full text-left ${currentDirectory === directory ? "bg-slate-800 shadow-sm" : "hover:bg-gray-600"}`}
          onClick={() => setCurrentDirectory(directory)}
        >
          {directory}
        </button>
      ))}
    </div>
  );
}

export default FileManagerDirectoryList;
