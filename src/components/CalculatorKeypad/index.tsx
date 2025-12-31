import { CALCULATOR_BUTTONS } from "../../constants";

interface CalculatorKeypadProps {
  handleClick: (value: string) => void;
}

function CalculatorKeypad({ handleClick }: CalculatorKeypadProps) {
  return (
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
  );
}

export default CalculatorKeypad;
