import Clock from "../Clock";
import PanelLauncherButton from "../PanelLauncherButton";
import PanelTaskList from "../PanelTaskList";

function Panel() {
  return (
    <nav className="fixed bottom-0 p-2 bg-panel w-full flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <PanelLauncherButton />
        <PanelTaskList />
      </div>
      <Clock />
    </nav>
  );
}

export default Panel;
