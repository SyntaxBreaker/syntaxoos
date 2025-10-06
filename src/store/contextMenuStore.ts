import { create } from "zustand";

interface ContextMenuStore {
  isOpen: boolean;
  x: number;
  y: number;
  setIsOpen: (open?: boolean) => void;
  setPosition: (x: number, y: number) => void;
}

export const useContextMenuStore = create<ContextMenuStore>()((set) => ({
  isOpen: false,
  x: 0,
  y: 0,
  setIsOpen: (isOpen) => {
    set((state) => ({ isOpen: isOpen !== undefined ? isOpen : !state.isOpen }));
  },
  setPosition(x, y) {
    set(() => ({ x, y }));
  },
}));
