import { useState } from "react";

function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Welcome to SyntaxOS Terminal!",
    "Type 'help' to see available commands.",
  ]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newLines = [...lines, `guest@syntaxos:~$ ${input}`];
      if (input === "help") {
        newLines.push(`Available commands: help, echo`);
      } else if (input.startsWith("echo")) {
        newLines.push(input.slice(5));
      } else {
        newLines.push(
          `Command "${input}" not recognized. Type "help" for a list of commands.`
        );
      }

      setLines(newLines);
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
