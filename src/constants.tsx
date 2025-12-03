import type { FileList } from "./types";
import arcade from "./assets/arcade.wav";
import moonwalk from "./assets/moonwalk.jpg";

export const COMMANDS = ["about", "clear", "echo", "help"] as const;

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
  echo: (input: string) => input.slice(5),
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
