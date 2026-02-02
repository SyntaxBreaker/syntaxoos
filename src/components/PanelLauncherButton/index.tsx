import menuIcon from "../../assets/icons/menu.svg";

function PanelLauncherButton() {
  return (
    <button className="p-0 hover:cursor-pointer" aria-label="Open menu">
      <img src={menuIcon} alt="menu icon" />
    </button>
  );
}

export default PanelLauncherButton;
