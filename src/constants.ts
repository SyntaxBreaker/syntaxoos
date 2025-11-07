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

export const COMMANDS = ["about", "clear", "echo", "help"];

export const SYSTEM_INFO = [
  "OS: SyntaxoOS 1.0.0 (Powered by TypeScript)",
  "Kernel: 1.0.0-typescript (Stable - probably)",
  "Shell: SyntaxShell 1.0.0",
  "CPU: Intel Core2 Duo E8400 (Still the best CPU)",
  "Memory: 128TB",
  "Author: SyntaxBreaker",
];

export const commandHandlers = {
  help: () => [`Available commands: ${COMMANDS.join(", ")}`],
  about: () => SYSTEM_INFO,
  echo: (input: string) => input.slice(5),
};
