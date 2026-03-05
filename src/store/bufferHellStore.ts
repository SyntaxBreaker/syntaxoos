import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GameStatus = "MENU" | "PLAYING" | "GAME_OVER";
type Difficulty = "EASY" | "NORMAL" | "HARD";

interface BufferHellStore {
  status: GameStatus;
  score: number;
  highScore: number;
  difficulty: Difficulty;
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
      difficulty: "NORMAL",
      startGame: () =>
        set({
          status: "PLAYING",
          score: 0,
          difficulty: "NORMAL",
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
          difficulty: "NORMAL",
        }),
    }),
    {
      name: "buffer-hell-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ highScore: state.highScore }),
    },
  ),
);
