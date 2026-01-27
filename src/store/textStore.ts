import { create } from "zustand";

interface TextStore {
  content: string;
  fileFormat: string | null;
  textFileName: string | null;
  setDocument: (
    content: string,
    fileFormat: string | null,
    textFileName: string,
  ) => void;
}

export const useTextStore = create<TextStore>()((set) => ({
  textFileName: null,
  content: "",
  fileFormat: null,
  setDocument: (content, fileFormat, textFileName) =>
    set({
      content: content,
      fileFormat: fileFormat,
      textFileName: textFileName,
    }),
}));
