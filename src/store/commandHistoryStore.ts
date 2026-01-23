import { create } from "zustand";

interface CommandHistoryStore {
  currentIndex: number;
  commandHistory: string[];
  addCommandToHistory: (command: string) => void;
  resetCommandHistoryIndex: () => void;
  getCommand: (direction: "up" | "down") => string | null;
}

export const useCommandHistoryStore = create<CommandHistoryStore>()(
  (set, get) => ({
    commandHistory: [],
    currentIndex: -1,
    addCommandToHistory: (command) =>
      set((state) => ({
        commandHistory: [...state.commandHistory, command],
        currentIndex: -1,
      })),
    resetCommandHistoryIndex: () => {
      set({ currentIndex: -1 });
    },
    getCommand: (direction) => {
      const { commandHistory, currentIndex } = get();
      if (commandHistory.length === 0) return null;

      let nextIndex: number;

      if (direction === "up") {
        nextIndex =
          currentIndex === -1 ? commandHistory.length - 1 : currentIndex - 1;
      } else if (direction === "down") {
        if (currentIndex === -1) {
          return null;
        }
        nextIndex = currentIndex + 1;
      } else {
        return null;
      }

      if (nextIndex >= 0 && nextIndex < commandHistory.length) {
        set({ currentIndex: nextIndex });
        return commandHistory[nextIndex];
      } else if (nextIndex >= commandHistory.length) {
        set({ currentIndex: -1 });
        return "";
      }

      return commandHistory[0];
    },
  }),
);
