import type { CalculatorButton, FileList } from "./types";
import arcade from "./assets/sounds/arcade.wav";
import moonwalk from "./assets/images/moonwalk.jpg";

export const COMMANDS = [
  "about",
  "clear",
  "echo",
  "help",
  "whoami",
  "date",
] as const;

export const SYSTEM_INFO = [
  "OS: SyntaxoOS 1.0.0 (Powered by TypeScript)",
  "Kernel: 1.0.0-typescript (Stable - probably)",
  "Shell: SyntaxShell 1.0.0",
  "CPU: Intel Core2 Duo E8400 (Still the best CPU)",
  "Memory: 128TB",
  "Author: SyntaxBreaker",
] as const;

export const commandHandlers = {
  help: () => [`Available commands: ${COMMANDS.join(", ")}`],
  about: () => SYSTEM_INFO,
  echo: (input: string) => input,
  whoami: () => "guest",
  date: () => new Date().toLocaleString(),
} as const;

export const INITIAL_FILE_LIST: FileList = {
  home: [
    {
      id: 0,
      name: "password.txt",
      content: "You thought it would be that easy? LOL.",
    },
    {
      id: 1,
      name: "TODO.md",
      content: "# Everything and Nothing",
    },
  ],
  downloads: [],
  music: [
    {
      id: 2,
      name: "random_noises_at_3am.wav",
      audioSrc: arcade,
    },
  ],
  pictures: [
    {
      id: 3,
      name: "never_send_anyone.png",
      imgSrc: moonwalk,
    },
  ],
};

export const CALCULATOR_BUTTONS: CalculatorButton[] = [
  { id: 0, label: "AC", span: 2, color: "bg-red-500 hover:bg-red-600" },
  { id: 1, label: "DEL", span: 1, color: "bg-gray-500 hover:bg-gray-600" },
  { id: 2, label: "/", span: 1, color: "bg-orange-500 hover:bg-orange-600" },
  { id: 3, label: "7", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 4, label: "8", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 5, label: "9", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 6, label: "*", span: 1, color: "bg-orange-500 hover:bg-orange-600" },
  { id: 7, label: "4", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 8, label: "5", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 9, label: "6", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 10, label: "-", span: 1, color: "bg-orange-500 hover:bg-orange-600" },
  { id: 11, label: "1", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 12, label: "2", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 13, label: "3", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 14, label: "+", span: 1, color: "bg-orange-500 hover:bg-orange-600" },
  { id: 15, label: "0", span: 2, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 16, label: ".", span: 1, color: "bg-gray-700 hover:bg-gray-800" },
  { id: 17, label: "=", span: 1, color: "bg-green-500 hover:bg-green-600" },
];
