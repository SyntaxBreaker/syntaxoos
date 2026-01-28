import { create } from "zustand";

interface TextStore {
  content: string;
  fileFormat: string | null;
  setDocument: (content: string, fileFormat: string | null) => void;
}

export const useTextStore = create<TextStore>()((set) => ({
  content: "",
  fileFormat: null,
  setDocument: (content, fileFormat) =>
    set({
      content: content,
      fileFormat: fileFormat,
    }),
}));
