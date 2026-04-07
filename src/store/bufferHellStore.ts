import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  BufferHellGameStatus,
  BufferHellHero,
  BufferHellPromotion,
} from "../types";
import { BUFFER_HELL_HEROES } from "../constants";

interface BufferHellStore {
  experienceToNextLevel: number;
  gameStatus: BufferHellGameStatus;
  highScore: number;
  hero: BufferHellHero;
  playerExperience: number;
  playerHP: number;
  playerLevel: number;
  playerSpeed: number;
  playerFireRate: number;
  score: number;
  addScore: (points: number) => void;
  promotePlayer: (promotionType: BufferHellPromotion) => void;
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
      playerFireRate: 0,
      playerHP: BUFFER_HELL_HEROES[0].baseHealth,
      playerLevel: 1,
      playerSpeed: 0,
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
              gameStatus: "levelUp",
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
      promotePlayer: (promotionType) => {
        set((state) => {
          const gameStatus = { gameStatus: "playing" as BufferHellGameStatus };

          switch (promotionType) {
            case "agility":
              return { ...gameStatus, playerSpeed: state.playerSpeed + 0.5 };
            case "fireRate":
              return {
                ...gameStatus,
                playerFireRate: Math.max(5, state.playerFireRate - 2),
              };
            case "vitality":
              return {
                ...gameStatus,
                playerHP: state.playerHP + 20,
              };
            default:
              return gameStatus;
          }
        });
      },
      setGameStatus: (status) => {
        set((state) => {
          const newState: Partial<BufferHellStore> = { gameStatus: status };

          switch (status) {
            case "gameOver":
              newState.highScore = Math.max(state.score, state.highScore);
              newState.playerLevel = 1;
              newState.playerExperience = 0;
              newState.playerHP = state.hero.baseHealth;
              newState.playerSpeed = state.hero.baseSpeed;
              newState.playerFireRate = state.hero.baseFireRate;
              newState.score = 0;
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
          playerFireRate: hero.baseFireRate,
          playerSpeed: hero.baseSpeed,
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
