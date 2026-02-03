import { useWindowsStore } from "../../store/windowsStore";

interface WindowControlButtonsProps {
  id: number;
}

function WindowControlButtons({ id }: WindowControlButtonsProps) {
  const closeWindow = useWindowsStore((state) => state.closeWindow);
  const minimizeWindow = useWindowsStore((state) => state.minimizeWindow);

  return (
    <div className="flex flex-row gap-1">
      <button
        className="h-2 w-2 bg-green-600 rounded-xs cursor-pointer"
        onClick={() => minimizeWindow(id)}
      ></button>
      <button className="h-2 w-2 bg-yellow-600 rounded-xs"></button>
      <button
        className="h-2 w-2 bg-red-600 rounded-xs cursor-pointer"
        onClick={() => closeWindow(id)}
      ></button>
    </div>
  );
}

export default WindowControlButtons;
