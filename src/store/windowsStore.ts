import { create } from "zustand";

interface ActiveWindowItem {
  id: number;
  x: number;
  y: number;
}

interface windowsStore {
  activeWindows: ActiveWindowItem[];
  openWindow: (windowId: number) => void;
  closeWindow: (windowId: number) => void;
  isWindowOpen: (windowId: number) => boolean;
}

export const useWindowsStore = create<windowsStore>()((set, get) => ({
  activeWindows: [],
  openWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.some(
        (activeWindow) => activeWindow.id === windowId
      )
        ? state.activeWindows
        : [...state.activeWindows, { id: windowId, x: 100, y: 100 }],
    }));
  },
  closeWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.filter(
        (activeWindow) => activeWindow.id !== windowId
      ),
    }));
  },
  isWindowOpen: (windowId) =>
    get().activeWindows.some((activeWindow) => activeWindow.id === windowId),
}));
