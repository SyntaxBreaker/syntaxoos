import folderIcon from "./assets/folder.svg";
import terminalIcon from "./assets/terminal.svg";

interface App {
  id: number;
  name: string;
  iconSrc: string;
}

export const APPS: App[] = [
  {
    id: 0,
    name: "File manager",
    iconSrc: folderIcon,
  },
  {
    id: 1,
    name: "Terminal",
    iconSrc: terminalIcon,
  },
];