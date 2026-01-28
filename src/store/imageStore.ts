import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  setImage: (imageSrc: string, imageFileName: string) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  imageSrc: null,
  setImage: (imageSrc) => set({ imageSrc }),
}));
