import type { App } from "./types";
import APIClient from "./components/APIClient";
import BufferHell from "./components/BufferHell";
import Calculator from "./components/Calculator";
import Contact from "./components/Contact";
import Dictionary from "./components/Dictionary";
import FileManager from "./components/FileManager";
import ImageViewer from "./components/ImageViewer";
import MorseCodeTranslator from "./components/MorseCodeTranslator";
import MusicPlayer from "./components/MusicPlayer";
import Portfolio from "./components/Portfolio";
import Settings from "./components/Settings";
import SystemInfoMonitor from "./components/SystemInfoMonitor";
import TaskManager from "./components/TaskManager";
import Terminal from "./components/Terminal";
import TextReader from "./components/TextReader";
import apiIcon from "./assets/icons/api.svg";
import bufferHellIcon from "./assets/icons/bufferHell.svg";
import calculatorIcon from "./assets/icons/calculator.svg";
import contactIcon from "./assets/icons/contact.svg";
import dictionaryIcon from "./assets/icons/dictionary.svg";
import folderIcon from "./assets/icons/folder.svg";
import imageViewerIcon from "./assets/icons/image.svg";
import morseCodeIcon from "./assets/icons/morseCode.svg";
import musicIcon from "./assets/icons/music.svg";
import portfolioIcon from "./assets/icons/portfolio.svg";
import terminalIcon from "./assets/icons/terminal.svg";
import textReaderIcon from "./assets/icons/text.svg";
import systemInfoMonitorIcon from "./assets/icons/systemInfoMonitor.svg";
import settingsIcon from "./assets/icons/settings.svg";
import taskManagerIcon from "./assets/icons/task.svg";

export const WINDOW_ID = {
  fileManager: 0,
  terminal: 1,
  imageViewer: 2,
  textReader: 3,
  musicPlayer: 4,
  portfolio: 5,
  calculator: 6,
  settings: 7,
  contact: 8,
  systemMonitor: 9,
  dictionary: 10,
  taskManager: 11,
  morseCodeTranslator: 12,
  apiClient: 13,
  bufferHell: 14,
} as const;

export const APPS: App[] = [
  {
    id: WINDOW_ID.fileManager,
    windowName: "File manager",
    component: <FileManager />,
    iconSrc: folderIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.terminal,
    windowName: "Terminal",
    component: <Terminal />,
    iconSrc: terminalIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.imageViewer,
    windowName: "Image Viewer",
    component: <ImageViewer />,
    iconSrc: imageViewerIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.textReader,
    windowName: "Text Reader",
    component: <TextReader />,
    iconSrc: textReaderIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.musicPlayer,
    windowName: "Music Player",
    component: <MusicPlayer />,
    iconSrc: musicIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.portfolio,
    windowName: "Portfolio",
    component: <Portfolio />,
    iconSrc: portfolioIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.calculator,
    windowName: "Calculator",
    component: <Calculator />,
    iconSrc: calculatorIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.settings,
    windowName: "Settings",
    component: <Settings />,
    iconSrc: settingsIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.contact,
    windowName: "Contact",
    component: <Contact />,
    iconSrc: contactIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.systemMonitor,
    windowName: "System Monitor",
    component: <SystemInfoMonitor />,
    iconSrc: systemInfoMonitorIcon,
    showOnDesktop: false,
  },
  {
    id: WINDOW_ID.dictionary,
    windowName: "Dictionary",
    component: <Dictionary />,
    iconSrc: dictionaryIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.taskManager,
    windowName: "Task Manager",
    component: <TaskManager />,
    iconSrc: taskManagerIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.morseCodeTranslator,
    windowName: "Morse Code Translator",
    component: <MorseCodeTranslator />,
    iconSrc: morseCodeIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.apiClient,
    windowName: "API Client",
    component: <APIClient />,
    iconSrc: apiIcon,
    showOnDesktop: true,
  },
  {
    id: WINDOW_ID.bufferHell,
    windowName: "Buffer Hell",
    component: <BufferHell />,
    iconSrc: bufferHellIcon,
    showOnDesktop: true,
  },
] as const;
