import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BufferHellGameStatus, BufferHellPromotion } from "../types";
import { BUFFER_HELL_HEROES } from "../constants";

interface BufferHellStore {
  experienceToNextLevel: number;
  gameStatus: BufferHellGameStatus;
  highScore: number;
  selectedHeroId: number;
  playerExperience: number;
  playerHP: number;
  playerLevel: number;
  playerSpeed: number;
  playerFireRate: number;
  score: number;
  addScore: (points: number) => void;
  promotePlayer: (promotionType: BufferHellPromotion) => void;
  gainExperience: (experience: number) => void;
  setHero: (heroId: number) => void;
  setGameStatus: (status: BufferHellGameStatus) => void;
  takeDamage: (damage: number) => void;
}

export const useBufferHellStore = create<BufferHellStore>()(
  persist(
    (set) => ({
      experienceToNextLevel: 100,
      gameStatus: "menu",
      highScore: 0,
      selectedHeroId: BUFFER_HELL_HEROES[0].id,
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
                playerHP:
                  BUFFER_HELL_HEROES[state.selectedHeroId].baseHealth + 20,
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
              newState.playerHP =
                BUFFER_HELL_HEROES[state.selectedHeroId].baseHealth;
              newState.playerSpeed =
                BUFFER_HELL_HEROES[state.selectedHeroId].baseSpeed;
              newState.playerFireRate =
                BUFFER_HELL_HEROES[state.selectedHeroId].baseFireRate;
              newState.score = 0;
              break;
            case "menu":
              newState.score = 0;
              newState.playerHP =
                BUFFER_HELL_HEROES[state.selectedHeroId].baseHealth;
              break;
          }

          return newState;
        });
      },
      setHero: (heroId) =>
        set({
          selectedHeroId: heroId,
          playerHP: BUFFER_HELL_HEROES[heroId].baseHealth,
          playerFireRate: BUFFER_HELL_HEROES[heroId].baseFireRate,
          playerSpeed: BUFFER_HELL_HEROES[heroId].baseSpeed,
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
