interface TerminalPromptProps {
  prefix: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
}

function TerminalPrompt({
  prefix,
  value,
  onChange,
  onKeyDown,
  inputRef,
}: TerminalPromptProps) {
  return (
    <div className="flex flex-row gap-1">
      <p>{prefix}</p>
      <input
        className="outline-none border-none text-green-400 flex-1 font-bold"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
        ref={inputRef}
      />
    </div>
  );
}

export default TerminalPrompt;
