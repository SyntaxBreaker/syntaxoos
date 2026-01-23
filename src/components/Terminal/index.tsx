import { useEffect, useRef, useState } from "react";
import { COMMANDS } from "../../constants";
import { useAccountStore } from "../../store/accountStore";
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
  const getCommand = useCommandHistoryStore((state) => state.getCommand);
  const getUptime = useUptimeStore((state) => state.getUptime);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommandExecution = () => {
    if (input.trim() === "") {
      setLines((prev) => [...prev, PROMPT_PREFIX]);
      setInput("");
      return;
    }

    const [command, ...args] = input.toLowerCase().trim().split(/\s+/);

    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const commandLine = `${PROMPT_PREFIX} ${input}`;
    const newLines = [commandLine];

    if (command in COMMANDS) {
      const handler = COMMANDS[command as keyof typeof COMMANDS];
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

    setLines((prev) => [...prev, ...newLines]);
    setInput("");
    addCommandToHistory(command);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommandExecution();
      return;
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const cmd = getCommand(e.key === "ArrowUp" ? "up" : "down");
      console.log(cmd);
      if (cmd !== null) {
        setInput(cmd);
        return;
      }
    }
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
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}

export default Terminal;
