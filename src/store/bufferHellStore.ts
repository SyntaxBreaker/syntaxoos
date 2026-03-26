import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BufferHellGameStatus, BufferHellHero } from "../types";
import { BUFFER_HELL_HEROES } from "../constants";

interface BufferHellStore {
  gameStatus: BufferHellGameStatus;
  score: number;
  highScore: number;
  hero: BufferHellHero;
  playerHP: number;
  addScore: (points: number) => void;
  setHero: (hero: BufferHellHero) => void;
  setGameStatus: (status: BufferHellGameStatus) => void;
  takeDamage: (damage: number) => void;
}

export const useBufferHellStore = create<BufferHellStore>()(
  persist(
    (set) => ({
      gameStatus: "menu",
      score: 0,
      highScore: 0,
      hero: BUFFER_HELL_HEROES[0],
      playerHP: BUFFER_HELL_HEROES[0].baseHealth,
      addScore: (points) =>
        set((state) => {
          const nextScore = state.score + points;
          return {
            score: nextScore,
          };
        }),
      setGameStatus: (status) => {
        set((state) => {
          const newState: Partial<BufferHellStore> = { gameStatus: status };

          switch (status) {
            case "gameOver":
              newState.highScore = Math.max(state.score, state.highScore);
              newState.score = 0;
              newState.playerHP = state.hero.baseHealth;
              break;
            case "menu":
              newState.score = 0;
              newState.playerHP = state.hero.baseHealth;
              break;
          }

          return newState;
        });
      },
      setHero: (hero) =>
        set({
          hero: hero,
          playerHP: hero.baseHealth,
        }),
      takeDamage: (damage) =>
        set((state) => {
          const newHP = state.playerHP - damage;
          return { playerHP: newHP };
        }),
    }),
    {
      name: "buffer-hell-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ highScore: state.highScore }),
    },
  ),
);
