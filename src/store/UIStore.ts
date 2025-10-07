import { create } from "zustand";

interface UIStore {
  showBootScreen: boolean;
  showDesktop: boolean;
  toggleBootScreen: () => void;
  toggleDesktop: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  showBootScreen: true,
  showDesktop: false,
  toggleBootScreen: () => {
    set((state) => ({ showBootScreen: !state.showBootScreen }));
  },
  toggleDesktop: () => {
    set((state) => ({ showDesktop: !state.showDesktop }));
  },
}));
