import { create } from "zustand";
import { WALLPAPERS } from "../constants";

interface SettingsStore {
  currentTab: string;
  currentWallpaper: string;
  setCurrentTab: (tabName: string) => void;
  setWallpaper: (wallpaperSrc: string) => void;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  currentTab: "General",
  currentWallpaper: WALLPAPERS[0].src,
  setCurrentTab: (tabName: string) => {
    set({ currentTab: tabName });
  },
  setWallpaper: (wallpaperSrc: string) =>
    set({ currentWallpaper: wallpaperSrc }),
}));
