import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BufferHellGameStatus, BufferHellHero } from "../types";
import { BUFFER_HELL_HEROES } from "../constants";

interface BufferHellStore {
  experienceToNextLevel: number;
  gameStatus: BufferHellGameStatus;
  highScore: number;
  hero: BufferHellHero;
  playerExperience: number;
  playerHP: number;
  playerLevel: number;
  score: number;
  addScore: (points: number) => void;
  gainExperience: (experience: number) => void;
  setHero: (hero: BufferHellHero) => void;
  setGameStatus: (status: BufferHellGameStatus) => void;
  takeDamage: (damage: number) => void;
}

export const useBufferHellStore = create<BufferHellStore>()(
  persist(
    (set) => ({
      experienceToNextLevel: 100,
      gameStatus: "menu",
      highScore: 0,
      hero: BUFFER_HELL_HEROES[0],
      playerExperience: 0,
      playerHP: BUFFER_HELL_HEROES[0].baseHealth,
      playerLevel: 1,
      score: 0,
      addScore: (points) =>
        set((state) => {
          const nextScore = state.score + points;
          return {
            score: nextScore,
          };
        }),
      gainExperience: (experience) =>
        set((state) => {
          const newExperience = state.playerExperience + experience;
          if (newExperience >= state.experienceToNextLevel) {
            return {
              playerLevel: state.playerLevel + 1,
              playerExperience: newExperience - state.experienceToNextLevel,
              experienceToNextLevel: Math.floor(
                state.experienceToNextLevel * 1.5,
              ),
            };
          }

          return {
            playerExperience: newExperience,
          };
        }),
      setGameStatus: (status) => {
        set((state) => {
          const newState: Partial<BufferHellStore> = { gameStatus: status };

          switch (status) {
            case "gameOver":
              newState.highScore = Math.max(state.score, state.highScore);
              newState.playerLevel = 1;
              newState.playerExperience = 0;
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
