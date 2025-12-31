interface CalculatorDisplayProps {
  expression: string;
  result: string;
}

function CalculatorDisplay({ expression, result }: CalculatorDisplayProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 min-h-[80px] flex flex-col justify-end">
      <p className="text-right text-gray-400 text-sm mb-1 truncate">
        {expression || "0"}
      </p>
      <p className="text-right text-white text-3xl font-bold">
        {result || "0"}
      </p>
    </div>
  );
}

export default CalculatorDisplay;
