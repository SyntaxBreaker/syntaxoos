interface TerminalLineProps {
  line: string;
}

function TerminalLine({ line }: TerminalLineProps) {
  return <p className="whitespace-pre-wrap">{line}</p>;
}

export default TerminalLine;
