import { create } from "zustand";
import { VIRTUAL_FILE_SYSTEM } from "../constants";
import type { FileSystemItem } from "../types";

interface FileSystemStore {
  currentDirectory: string;
  directories: string[];
  fileList: Record<string, FileSystemItem[]>;
  setCurrentDirectory: (directory: string) => void;
}

export const useFileSystemStore = create<FileSystemStore>()((set) => ({
  currentDirectory: "home",
  directories: Object.keys(VIRTUAL_FILE_SYSTEM),
  fileList: VIRTUAL_FILE_SYSTEM,
  setCurrentDirectory: (directory) =>
    set({ currentDirectory: directory }),
}));
