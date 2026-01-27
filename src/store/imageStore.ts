import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  imageFileName: string | null;
  setImage: (imageSrc: string, imageFileName: string) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  imageSrc: null,
  imageFileName: null,
  setImage: (imageSrc, imageFileName) => set({ imageSrc, imageFileName }),
}));
