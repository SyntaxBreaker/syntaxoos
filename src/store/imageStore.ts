import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  setImageSrc: (imageSrc: string) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  imageSrc: null,
  setImageSrc: (imgSrc: string) => set({imageSrc: imgSrc})
}));
