import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BufferHellGameStatus } from "../types";

interface BufferHellStore {
  status: BufferHellGameStatus;
  score: number;
  highScore: number;
  startGame: () => void;
  endGame: () => void;
  addScore: (points: number) => void;
  resetGame: () => void;
}

export const useBufferHellStore = create<BufferHellStore>()(
  persist(
    (set) => ({
      status: "menu",
      score: 0,
      highScore: 0,
      startGame: () =>
        set({
          status: "playing",
          score: 0,
        }),
      endGame: () =>
        set((state) => ({
          status: "gameOver",
          highScore: Math.max(state.score, state.highScore),
        })),
      addScore: (points) =>
        set((state) => {
          const nextScore = state.score + points;
          return {
            score: nextScore,
          };
        }),
      resetGame: () =>
        set({
          status: "playing",
          score: 0,
        }),
    }),
    {
      name: "buffer-hell-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ highScore: state.highScore }),
    },
  ),
);
