import type { App } from "./types";
import Calculator from "./components/Calculator";
import Contact from "./components/Contact";
import Dictionary from "./components/Dictionary";
import FileManager from "./components/FileManager";
import ImageViewer from "./components/ImageViewer";
import MusicPlayer from "./components/MusicPlayer";
import Portfolio from "./components/Portfolio";
import Settings from "./components/Settings";
import SystemMonitor from "./components/SystemMonitor";
import TaskManager from "./components/TaskManager";
import Terminal from "./components/Terminal";
import TextReader from "./components/TextReader";
import calculatorIcon from "./assets/icons/calculator.svg";
import contactIcon from "./assets/icons/contact.svg";
import dictionaryIcon from "./assets/icons/dictionary.svg";
import folderIcon from "./assets/icons/folder.svg";
import imageViewerIcon from "./assets/icons/image.svg";
import musicIcon from "./assets/icons/music.svg";
import portfolioIcon from "./assets/icons/portfolio.svg";
import terminalIcon from "./assets/icons/terminal.svg";
import textReaderIcon from "./assets/icons/text.svg";
import systemMonitorIcon from "./assets/icons/systemMonitor.svg";
import settingsIcon from "./assets/icons/settings.svg";
import TaskManagerIcon from "./assets/icons/task.svg";

export const WINDOW_ID = {
  FILE_MANAGER: 0,
  TERMINAL: 1,
  IMAGE_VIEWER: 2,
  TEXT_READER: 3,
  MUSIC_PLAYER: 4,
  PORTFOLIO: 5,
  CALCULATOR: 6,
  SETTINGS: 7,
  CONTACT: 8,
  SYSTEM_MONITOR: 9,
  DICTIONARY: 10,
  TASK_MANAGER: 11,
} as const;

export const APPS: App[] = [
  {
    id: WINDOW_ID.FILE_MANAGER,
    windowName: "File manager",
    component: <FileManager />,
    iconSrc: folderIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.TERMINAL,
    windowName: "Terminal",
    component: <Terminal />,
    iconSrc: terminalIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.IMAGE_VIEWER,
    windowName: "Image Viewer",
    component: <ImageViewer />,
    iconSrc: imageViewerIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.TEXT_READER,
    windowName: "Text Reader",
    component: <TextReader />,
    iconSrc: textReaderIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.MUSIC_PLAYER,
    windowName: "Music Player",
    component: <MusicPlayer />,
    iconSrc: musicIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.PORTFOLIO,
    windowName: "Portfolio",
    component: <Portfolio />,
    iconSrc: portfolioIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.CALCULATOR,
    windowName: "Calculator",
    component: <Calculator />,
    iconSrc: calculatorIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.SETTINGS,
    windowName: "Settings",
    component: <Settings />,
    iconSrc: settingsIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.CONTACT,
    windowName: "Contact",
    component: <Contact />,
    iconSrc: contactIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.SYSTEM_MONITOR,
    windowName: "System Monitor",
    component: <SystemMonitor />,
    iconSrc: systemMonitorIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.DICTIONARY,
    windowName: "Dictionary",
    component: <Dictionary />,
    iconSrc: dictionaryIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.TASK_MANAGER,
    windowName: "Task Manager",
    component: <TaskManager />,
    iconSrc: TaskManagerIcon,
    showOnDesktop: true,
  },
] as const;
