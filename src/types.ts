export interface App {
  id: number;
  name: string;
  component: React.ReactNode;
  iconSrc: string;
  showOnDesktop: boolean;
}

export type FileType = "text" | "markdown" | "audio" | "image";

export interface FileSystemItem {
  id: number;
  name: string;
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
