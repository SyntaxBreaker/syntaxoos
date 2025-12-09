import { useWindowsStore } from "../../store/windowsStore";

interface TitleBarProps {
  dragOffsetRef: React.RefObject<{
    offsetX: number;
    offsetY: number;
  }>;
  id: number;
  name: string;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
}

function TitleBar({
  dragOffsetRef,
  id,
  name,
  setIsDragging,
  x,
  y,
}: TitleBarProps) {
  const closeWindow = useWindowsStore((state) => state.closeWindow);
  const minimizeWindow = useWindowsStore((state) => state.minimizeWindow);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragOffsetRef.current = {
      offsetX: e.clientX - x,
      offsetY: e.clientY - y,
    };

    setIsDragging(true);
  };

  return (
    <div
      className="flex flex-row justify-between items-center cursor-move p-2 border-b border-border-primary sticky top-0 left-0"
      onMouseDown={handleMouseDown}
    >
      <p className="text-white text-sm font-bold select-none">{name}</p>
      <div className="flex flex-row gap-1">
        <div
          className="h-2 w-2 bg-green-600 rounded-xs cursor-pointer"
          onClick={() => minimizeWindow(id)}
        ></div>
        <div className="h-2 w-2 bg-yellow-600 rounded-xs"></div>
        <div
          className="h-2 w-2 bg-red-600 rounded-xs cursor-pointer"
          onClick={() => closeWindow(id)}
        ></div>
      </div>
    </div>
  );
}

export default TitleBar;
