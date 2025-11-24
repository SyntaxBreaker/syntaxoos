import { create } from "zustand";

interface ContextMenuStore {
  activeId: string | null;
  x: number;
  y: number;
  openContextMenu: (id: string, x: number, y: number) => void;
  closeContextMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuStore>()((set) => ({
  activeId: null,
  x: 0,
  y: 0,
  openContextMenu: (id, x, y) => set({ activeId: id, x, y }),
  closeContextMenu: () => set({ activeId: null }),
}));
