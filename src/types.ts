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

type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}
