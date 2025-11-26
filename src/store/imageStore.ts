import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  imageName: string | null;
  setImageSrc: (imageSrc: string, imageName: string) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  imageSrc: null,
  imageName: null,
  setImageSrc: (imgSrc: string, imgName: string) =>
    set({ imageSrc: imgSrc, imageName: imgName }),
}));
