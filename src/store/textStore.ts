import { create } from "zustand";

interface TextStore {
  content: string;
  setContent: (content: string) => void;
}

export const useTextStore = create<TextStore>()((set) => ({
  content: "",
  setContent: (text: string) => set({ content: text }),
}));
