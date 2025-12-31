import { useState } from "react";
import { evaluate } from "mathjs";
import CalculatorDisplay from "../CalculatorDisplay";
import CalculatorKeypad from "../CalculatorKeypad";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    if (value === "") {
      return;
    } else if (value === "AC") {
      setExpression("");
      setResult("");
    } else if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = evaluate(expression);
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      const last = expression.slice(-1);
      if (["+", "-", "*", "/"].includes(last)) {
        setExpression((prev) => prev.slice(0, -1) + value);
      } else {
        setExpression((prev) => prev + value);
      }
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className="h-full w-full shadow-2xl p-4">
      <CalculatorDisplay expression={expression} result={result} />
      <CalculatorKeypad handleClick={handleClick} />
    </div>
  );
}

export default Calculator;
