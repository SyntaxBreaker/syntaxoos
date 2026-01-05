import type { App } from "./types";
import Calculator from "./components/Calculator";
import Portfolio from "./components/Portfolio";
import FileManager from "./components/FileManager";
import ImageViewer from "./components/ImageViewer";
import MusicPlayer from "./components/MusicPlayer";
import Terminal from "./components/Terminal";
import TextReader from "./components/TextReader";
import calculatorIcon from "./assets/icons/calculator.svg";
import folderIcon from "./assets/icons/folder.svg";
import imageViewerIcon from "./assets/icons/image.svg";
import musicIcon from "./assets/icons/music.svg";
import portfolioIcon from "./assets/icons/portfolio.svg";
import terminalIcon from "./assets/icons/terminal.svg";
import textReaderIcon from "./assets/icons/text.svg";
import Settings from "./components/Settings";
import settingsIcon from "./assets/icons/settings.svg";

export const WINDOW_ID = {
  FILE_MANAGER: 0,
  TERMINAL: 1,
  IMAGE_VIEWER: 2,
  TEXT_READER: 3,
  MUSIC_PLAYER: 4,
  PORTFOLIO: 5,
  CALCULATOR: 6,
  SETTINGS: 7,
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
  {
    id: WINDOW_ID.PORTFOLIO,
    name: "Portfolio",
    component: <Portfolio />,
    iconSrc: portfolioIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.CALCULATOR,
    name: "Calculator",
    component: <Calculator />,
    iconSrc: calculatorIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.SETTINGS,
    name: "Settings",
    component: <Settings />,
    iconSrc: settingsIcon,
    showOnDesktop: true,
  }
] as const;
