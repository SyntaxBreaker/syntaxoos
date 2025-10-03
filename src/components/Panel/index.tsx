import menuIcon from "../../assets/menuicon.svg";
import Clock from "../Clock";

function Panel() {
  return (
    <div className="fixed bottom-0 p-2 bg-panel w-full flex flex-row justify-between">
      <button className="p-0 hover:cursor-pointer" aria-label="Open menu">
        <img src={menuIcon} alt="menu icon" />
      </button>
      <Clock />
    </div>
  );
}

export default Panel;
