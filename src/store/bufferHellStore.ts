import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GameStatus } from "../constants";

interface BufferHellStore {
  status: GameStatus;
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
      status: "MENU",
      score: 0,
      highScore: 0,
      startGame: () =>
        set({
          status: "PLAYING",
          score: 0,
        }),
      endGame: () =>
        set((state) => ({
          status: "GAME_OVER",
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
          status: "PLAYING",
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
