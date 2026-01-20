import { create } from "zustand";

interface CommandHistoryStore {
  commandHistory: string[];
  addCommandToHistory: (command: string) => void;
}

export const useCommandHistoryStore = create<CommandHistoryStore>()((set) => ({
  commandHistory: [],
  addCommandToHistory: (command) =>
    set((state) => ({ commandHistory: [...state.commandHistory, command] })),
}));
