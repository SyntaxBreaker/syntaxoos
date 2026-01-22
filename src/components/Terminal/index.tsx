import { useEffect, useRef, useState } from "react";
import { commandHandlers } from "../../constants";
import { useAccountStore } from "../../store/accountStore";
import type { CommandHandler } from "../../types";
import { useCommandHistoryStore } from "../../store/commandHistoryStore";
import { useUptimeStore } from "../../store/useUptimeStore";

function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Welcome to SyntaxOS Terminal!",
    "Type 'help' to see available commands.",
  ]);
  const user = useAccountStore((state) => state.user);
  const PROMPT_PREFIX = `${user.username}@syntaxos:~$`;
  const addCommandToHistory = useCommandHistoryStore(
    (state) => state.addCommandToHistory,
  );
  const commandHistory = useCommandHistoryStore(
    (state) => state.commandHistory,
  );
  const getUptime = useUptimeStore((state) => state.getUptime);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommandExecution = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || input.trim() === "") return;
    const [command, ...args] = input.toLowerCase().trim().split(/\s+/);
    setInput("");

    if (command === "clear") {
      setLines([]);
      return;
    }

    const newLines = [...lines, `${PROMPT_PREFIX} ${input}`];

    if (command in commandHandlers) {
      const handler = commandHandlers[
        command as keyof typeof commandHandlers
      ] as CommandHandler;
      const output = handler({
        args,
        user,
        commandHistory,
        currentUptime: getUptime(),
      });

      if (Array.isArray(output)) {
        newLines.push(...output);
      } else {
        newLines.push(output);
      }
    } else {
      newLines.push(
        `Command "${command}" not recognized. Type "help" for a list of commands.`,
      );
    }

    addCommandToHistory(command);
    setLines(newLines);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="text-white text-sm flex flex-col gap-1 py-2">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      <div className="flex flex-row gap-1" ref={bottomRef}>
        <p>{PROMPT_PREFIX}</p>
        <input
          className="outline-none border-none text-green-400 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommandExecution}
          autoFocus
        />
      </div>
    </div>
  );
}

export default Terminal;
