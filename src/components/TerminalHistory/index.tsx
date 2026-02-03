interface TerminalHistoryProps {
  lines: string[];
}

function TerminalHistory({ lines }: TerminalHistoryProps) {
  return (
    <>
      {lines.map((line, idx) => (
        <p key={idx} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
    </>
  );
}

export default TerminalHistory;
