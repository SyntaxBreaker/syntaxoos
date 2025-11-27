import { create } from "zustand";

interface ImageStore {
  imageSrc: string | null;
  imageName: string | null;
  setImage: (imageSrc: string, imageName: string) => void;
}

export const useImageStore = create<ImageStore>()((set) => ({
  imageSrc: null,
  imageName: null,
  setImage: (imgSrc: string, imgName: string) =>
    set({ imageSrc: imgSrc, imageName: imgName }),
}));
