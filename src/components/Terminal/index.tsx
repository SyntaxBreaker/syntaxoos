import { useState } from "react";
import { commandHandlers } from "../../constants";
import { useAccountStore } from "../../store/useAccountStore";

type CommandHandler = (...args: string[]) => string;

function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Welcome to SyntaxOS Terminal!",
    "Type 'help' to see available commands.",
  ]);
  const user = useAccountStore((state) => state.user);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const [command, ...args] = input.toLowerCase().trim().split(/\s+/);

    if (command === "clear") {
      setLines([`${user.displayName}@syntaxos:~$`]);
      setInput("");
      return;
    }

    const newLines = [...lines, `${user.displayName}@syntaxos:~$ ${input}`];

    if (command in commandHandlers) {
      const handler = commandHandlers[
        command as keyof typeof commandHandlers
      ] as CommandHandler;
      const output = handler(args.join(" "));

      if (Array.isArray(output)) {
        newLines.push(...output);
      } else {
        newLines.push(output);
      }
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <div className="text-white text-sm flex flex-col gap-1 py-2">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      <div className="flex flex-row gap-1">
        <p>{user.displayName}@syntaxos:~$</p>
        <input
          className="outline-none border-none text-green-400 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
          autoFocus
        />
      </div>
    </div>
  );
}

export default Terminal;
