import { create } from "zustand";
import { WALLPAPERS } from "../constants";

interface SettingsStore {
  currentBackgroundSize: string;
  currentTab: string;
  currentWallpaper: string;
  setBackgroundSize: (size: string) => void;
  setCurrentTab: (tabName: string) => void;
  setWallpaper: (wallpaperSrc: string) => void;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  currentBackgroundSize: "Full",
  currentTab: "Appearance",
  currentWallpaper: WALLPAPERS[0].src,
  setBackgroundSize: (size) => {
    set({ currentBackgroundSize: size });
  },
  setCurrentTab: (tabName) => {
    set({ currentTab: tabName });
  },
  setWallpaper: (wallpaperSrc) => set({ currentWallpaper: wallpaperSrc }),
}));
