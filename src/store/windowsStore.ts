import { create } from "zustand";

interface windowsStore {
  activeWindows: number[];
  openWindow: (windowId: number) => void;
  closeWindow: (windowId: number) => void;
  isWindowOpen: (windowId: number) => boolean;
}

export const useWindowsStore = create<windowsStore>()((set, get) => ({
  activeWindows: [],
  openWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.includes(windowId)
        ? state.activeWindows
        : [...state.activeWindows, windowId],
    }));
  },
  closeWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.filter((id) => id !== windowId),
    }));
  },
  isWindowOpen: (windowId) => get().activeWindows.includes(windowId),
}));
