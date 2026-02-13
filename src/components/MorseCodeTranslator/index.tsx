import { useState, type FormEvent } from "react";
import { MORSE_CODE } from "../../constants";

function MorseCodeTranslator() {
  const [input, setInput] = useState("");
  const [morseOutput, setMorseOutput] = useState("");

  const handleTranslate = (e: FormEvent) => {
    e.preventDefault();

    const morseCode = input
      .toUpperCase()
      .split(/\s+/)
      .map((word) =>
        word
          .split("")
          .map((char) => MORSE_CODE[char] || "#")
          .join(" "),
      )
      .join(" / ")
      .trim();
    setMorseOutput(morseCode);
  };

  return (
    <div className="flex flex-col gap-4 max-w-full mx-auto p-4">
      <form className="flex gap-2" onSubmit={handleTranslate}>
        <input
          className="flex-1 p-2 border border-gray-600 rounded-md shadow-sm outline-none text-white"
          aria-label="Enter text to translate into Morse code"
          aria-required="true"
          required
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          value={input}
        />
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 hover:cursor-pointer"
          type="submit"
        >
          Translate
        </button>
      </form>
      <p
        className="p-2 border border-gray-400 rounded-md shadow-sm font-mono text-md text-gray-400 break-words"
        onContextMenu={(e) => e.stopPropagation()}
      >
        <strong>Morse Code:</strong> {morseOutput}
      </p>
    </div>
  );
}

export default MorseCodeTranslator;
