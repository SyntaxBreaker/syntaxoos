import type { CalculatorButton, CommandPayload, FileList } from "./types";
import arcade from "./assets/sounds/arcade.wav";
import moonwalk from "./assets/images/moonwalk.jpg";
import defaultWallpaper from "./assets/wallpapers/default.jpg";

export const SYSTEM_INFO: string[] = [
  "OS: SyntaxoOS 1.0.0 (Powered by TypeScript)",
  "Kernel: 1.0.0-typescript (Stable - probably)",
  "Shell: SyntaxShell 1.0.0",
  "CPU: Intel Core2 Duo E8400 (Still the best CPU 😆)",
  "CPU @ 4.2GHz",
  "CPU Cores: 2",
  "Memory: 128TB",
  "Author: SyntaxBreaker",
] as const;

export const PS_OUTPUT = [
  "┌────────┬──────┬──────┬──────┬───────────────────────────────┬─────────────┐",
  "│ USER   │ PID  │ %CPU │ %MEM │ CMD                           │ STATUS      │",
  "├────────┼──────┼──────┼──────┼───────────────────────────────┼─────────────┤",
  "│ root   │ 1    │ 0.0  │ 0.1  │ /sbin/init                    │ Active      │",
  "│ root   │ 42   │ 0.0  │ 0.0  │ [meaning_of_life]             │ Questioning │",
  "│ root   │ 101  │ 99.9 │ 0.5  │ /usr/bin/node crypto_miner    │ Running     │",
  "│ root   │ 404  │ 0.0  │ 0.0  │ searching_for_gf              │ Missing     │",
  "│ root   │ 666  │ 6.6  │ 6.6  │ ./doom_eternal                │ Slaying     │",
  "│ root   │ 5031 │ 0.1  │ 85.2 │ chrome --open-tabs=300        │ Hungry      │",
  "│ root   │ 7777 │ 0.0  │ 0.0  │ FBI_VAN_SURVEILLANCE          │ Hidden      │",
  "└────────┴──────┴──────┴──────┴───────────────────────────────┴─────────────┘",
];

export const COMMANDS: Record<
  string,
  (data: CommandPayload) => string | string[]
> = {
  help: () => `Available commands: ${Object.keys(COMMANDS).join(", ")}`,
  about: () => SYSTEM_INFO,
  echo: ({ args }) => args,
  whoami: ({ user }) => user.username,
  date: () => new Date().toLocaleString(),
  history: ({ commandHistory }) => commandHistory,
  uptime: ({ currentUptime }) => currentUptime,
  ps: () => PS_OUTPUT,
};

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

export const WALLPAPERS = [
  {
    id: 0,
    src: defaultWallpaper,
  },
  {
    id: 1,
    src: moonwalk,
  },
];

export const RESOURCE_LIMITS = {
  cpu: 100,
  disk: 960,
  download: 600,
  memory: 32,
  upload: 600,
};
