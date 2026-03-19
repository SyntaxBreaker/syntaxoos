import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BufferHellGameStatus, BufferHellHero } from "../types";
import { BUFFER_HELL_HEROES } from "../constants";

interface BufferHellStore {
  gameStatus: BufferHellGameStatus;
  score: number;
  highScore: number;
  hero: BufferHellHero;
  addScore: (points: number) => void;
  setHero: (hero: BufferHellHero) => void;
  setGameStatus: (status: BufferHellGameStatus) => void;
}

export const useBufferHellStore = create<BufferHellStore>()(
  persist(
    (set) => ({
      gameStatus: "menu",
      score: 0,
      highScore: 0,
      hero: BUFFER_HELL_HEROES[0],
      addScore: (points) =>
        set((state) => {
          const nextScore = state.score + points;
          return {
            score: nextScore,
          };
        }),
      setGameStatus: (status) => {
        if (status === "playing") {
          set({
            gameStatus: status,
            score: 0,
          });
        } else if (status === "gameOver") {
          set((state) => {
            return {
              gameStatus: "gameOver",
              highScore: Math.max(state.score, state.highScore),
            };
          });
        } else if (status === "heroSelection") {
          set({
            gameStatus: "heroSelection",
          });
        } else if (status === "menu") {
          set({
            gameStatus: "menu",
            score: 0,
          });
        }
      },
      setHero: (hero) =>
        set({
          hero: hero,
        }),
    }),
    {
      name: "buffer-hell-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ highScore: state.highScore }),
    },
  ),
);
