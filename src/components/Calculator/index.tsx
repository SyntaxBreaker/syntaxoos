import { useState } from "react";
import { evaluate } from "mathjs";
import { CALCULATOR_BUTTONS } from "../../constants";
import CalculatorDisplay from "../CalculatorDisplay";

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
      <div className="grid grid-cols-4 gap-4 flex-1 h-[calc(100%-108px)]">
        {CALCULATOR_BUTTONS.map((button) => (
          <button
            key={button.id}
            className={`${button.color} ${
              button.span === 2 ? "col-span-2" : ""
            } text-white text-xl font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-md`}
            onClick={() => handleClick(button.label)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
