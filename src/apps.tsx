import folderIcon from "./assets/folder.svg";
import terminalIcon from "./assets/terminal.svg";
import imageViewerIcon from "./assets/image.svg";
import textReaderIcon from "./assets/text.svg";
import musicIcon from "./assets/music.svg";
import FileManager from "./components/FileManager";
import ImageViewer from "./components/ImageViewer";
import Terminal from "./components/Terminal";
import TextReader from "./components/TextReader";
import MusicPlayer from "./components/MusicPlayer";

interface App {
  id: number;
  name: string;
  component: React.ReactNode;
  iconSrc: string;
  showOnDesktop: boolean;
}

export const WINDOW_ID = {
  FILE_MANAGER: 0,
  TERMINAL: 1,
  IMAGE_VIEWER: 2,
  TEXT_READER: 3,
  MUSIC_PLAYER: 4,
} as const;

export const APPS: App[] = [
  {
    id: WINDOW_ID.FILE_MANAGER,
    name: "File manager",
    component: <FileManager />,
    iconSrc: folderIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.TERMINAL,
    name: "Terminal",
    component: <Terminal />,
    iconSrc: terminalIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.IMAGE_VIEWER,
    name: "Image Viewer",
    component: <ImageViewer />,
    iconSrc: imageViewerIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.TEXT_READER,
    name: "Text Reader",
    component: <TextReader />,
    iconSrc: textReaderIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.MUSIC_PLAYER,
    name: "Music Player",
    component: <MusicPlayer />,
    iconSrc: musicIcon,
    showOnDesktop: false,
  },
] as const;