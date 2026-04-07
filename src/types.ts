import { MORSE_CODE } from "./constants";

export interface App {
  id: number;
  windowName: string;
  component: React.ReactNode;
  iconSrc: string;
  showOnDesktop: boolean;
}

export type FileType = "text" | "markdown" | "audio" | "image";

export interface FileSystemItem {
  id: number;
  fileName: string;
  src: string;
  fileType: FileType;
}

export interface CalculatorButton {
  id: number;
  label: string;
  span: number;
  color: string;
}

export interface User {
  id: number;
  username: string;
  displayName: string;
}

export interface CommandPayload {
  args: string[];
  user: User;
  commandHistory: string[];
  currentUptime: string;
}

export interface SettingsTabItem {
  id: number;
  name: string;
  component: React.ReactNode;
}

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}

export type Morse = keyof typeof MORSE_CODE;

export type API_CLIENT_TAB = "parameters" | "headers" | "body" | "response";

export interface KeyValueItem {
  id: string;
  key: string;
  value: string;
}

export type APIClientBodyContentType =
  | "application/json"
  | "application/xml"
  | "text/plain";

export type BufferHellGameStatus =
  | "menu"
  | "heroSelection"
  | "playing"
  | "gameOver"
  | "pause"
  | "levelUp";

export interface BufferHellPlayer {
  x: number;
  y: number;
  radius: number;
  scale: number;
}

export interface BufferHellEnemy {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  damage: number;
}

export interface BufferHellBullet {
  x: number;
  y: number;
  radius: number;
}

export type BufferHellHeroName = "draconian" | "gargoyle";

export type BufferHellPromotion = "agility" | "fireRate" | "vitality";

export interface BufferHellHero {
  id: number;
  name: BufferHellHeroName;
  sprite: string;
  baseFireRate: number;
  baseHealth: number;
  baseSpeed: number;
  description: string;
}
