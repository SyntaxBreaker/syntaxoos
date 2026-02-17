import { useEffect, useRef, useState } from "react";
import { COMMANDS } from "../../constants";
import { useAccountStore } from "../../store/accountStore";
import { useCommandHistoryStore } from "../../store/commandHistoryStore";
import { useUptimeStore } from "../../store/uptimeStore";
import TerminalHistory from "../TerminalHistory";
import TerminalPrompt from "../TerminalPrompt";

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    addCommandToHistory(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCommandExecution();
      return;
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const cmd = getCommand(event.key === "ArrowUp" ? "up" : "down");
      if (cmd !== null) {
        setInput(cmd);
        return;
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div
      className="text-gray-200 text-sm flex flex-col gap-1 py-2 font-mono min-h-full"
      onClick={handleTerminalClick}
    >
      <TerminalHistory lines={lines} />
      <TerminalPrompt
        prefix={PROMPT_PREFIX}
        value={input}
        onChange={setInput}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Terminal;
