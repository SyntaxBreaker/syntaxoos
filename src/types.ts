export interface App {
  id: number;
  name: string;
  component: React.ReactNode;
  iconSrc: string;
  showOnDesktop: boolean;
}

export interface FileList {
  [key: string]: {
    id: number;
    name: string;
    imgSrc?: string;
    content?: string;
    audioSrc?: string;
  }[];
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
