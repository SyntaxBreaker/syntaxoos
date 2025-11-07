import { useState } from "react";
import { commandHandlers } from "../../constants";

function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Welcome to SyntaxOS Terminal!",
    "Type 'help' to see available commands.",
  ]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const command = input.toLowerCase().trim();
    if (e.key === "Enter") {
      if (command === "clear") {
        setLines([]);
      } else {
        const newLines = [...lines, `guest@syntaxos:~$ ${input}`];
        if (command === "help") {
          newLines.push(...commandHandlers.help());
        } else if (command === "about") {
          newLines.push(...commandHandlers.about());
        } else if (command.startsWith("echo")) {
          newLines.push(commandHandlers.echo(command));
        } else {
          newLines.push(
            `Command "${input}" not recognized. Type "help" for a list of commands.`
          );
        }
        setLines(newLines);
      }

      setInput("");
    }
  };

  return (
    <div className="text-white text-sm flex flex-col gap-1 py-2">
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      <div className="flex flex-row gap-1">
        <p>guest@syntaxos:~$</p>
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
