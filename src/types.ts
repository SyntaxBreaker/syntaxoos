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
