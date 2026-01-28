import { create } from "zustand";

interface ActiveWindowItem {
  id: number;
  x: number;
  y: number;
  isMinimized: boolean;
  fileName?: string;
}

interface windowsStore {
  activeWindows: ActiveWindowItem[];
  openWindow: (windowId: number, fileName?: string) => void;
  closeWindow: (windowId: number) => void;
  isWindowOpen: (windowId: number) => boolean;
  changePosition: (windowId: number, newX: number, newY: number) => void;
  minimizeWindow: (windowId: number) => void;
  isWindowMinimized: (windowId: number) => boolean;
  toggleMinimize: (windowId: number) => void;
}

export const useWindowsStore = create<windowsStore>()((set, get) => ({
  activeWindows: [],
  openWindow: (windowId, fileName) => {
    set((state) => {
      const isAlreadyOpen = state.activeWindows.some(
        (window) => window.id === windowId,
      );

      if (isAlreadyOpen) {
        return {
          activeWindows: state.activeWindows.map((window) =>
            window.id === windowId ? { ...window, fileName: fileName } : window,
          ),
        };
      }

      return {
        activeWindows: [
          ...state.activeWindows,
          {
            id: windowId,
            x: 100,
            y: 100,
            isMinimized: false,
            fileName: fileName,
          },
        ],
      };
    });
  },
  closeWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.filter(
        (activeWindow) => activeWindow.id !== windowId,
      ),
    }));
  },
  isWindowOpen: (windowId) =>
    get().activeWindows.some((activeWindow) => activeWindow.id === windowId),
  changePosition: (windowId, newX, newY) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((activeWindow) =>
        activeWindow.id === windowId
          ? { ...activeWindow, x: newX, y: newY }
          : activeWindow,
      ),
    }));
  },
  minimizeWindow: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((activeWindow) =>
        activeWindow.id === windowId
          ? { ...activeWindow, isMinimized: true }
          : activeWindow,
      ),
    }));
  },
  isWindowMinimized: (windowId) =>
    get().activeWindows.find((activeWindow) => activeWindow.id === windowId)
      ?.isMinimized ?? false,
  toggleMinimize: (windowId) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((activeWindow) =>
        activeWindow.id === windowId
          ? { ...activeWindow, isMinimized: !activeWindow.isMinimized }
          : activeWindow,
      ),
    }));
  },
}));
