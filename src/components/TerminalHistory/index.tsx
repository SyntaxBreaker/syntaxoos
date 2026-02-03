import TerminalLine from "../TerminalLine";

interface TerminalHistoryProps {
  lines: string[];
}

function TerminalHistory({ lines }: TerminalHistoryProps) {
  return (
    <>
      {lines.map((line, idx) => (
        <TerminalLine line={line} key={idx} />
      ))}
    </>
  );
}

export default TerminalHistory;
