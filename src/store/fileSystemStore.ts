import { create } from "zustand";
import { INITIAL_FILE_LIST } from "../constants";
import type { FileList } from "../types";

interface FileSystemStore {
  currentDirectory: string;
  directories: string[];
  fileList: FileList;
  setCurrentDirectory: (directory: string) => void;
}

export const useFileSystemStore = create<FileSystemStore>()((set) => ({
  currentDirectory: "home",
  directories: ["home", "downloads", "music", "pictures"],
  fileList: INITIAL_FILE_LIST,
  setCurrentDirectory: (directory: string) =>
    set({ currentDirectory: directory }),
}));