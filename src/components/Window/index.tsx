import { useEffect, useRef, useState } from "react";
import { useWindowsStore } from "../../store/windowsStore";

interface WindowProps {
  id: number;
  x: number;
  y: number;
  name: string;
  children: React.ReactNode;
}

function Window({ id, x, y, name, children }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ offsetX: 0, offsetY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const changePosition = useWindowsStore((state) => state.changePosition);
  const closeWindow = useWindowsStore((state) => state.closeWindow);
  const minimizeWindow = useWindowsStore((state) => state.minimizeWindow);
  const isWindowMinimized = useWindowsStore((state) => state.isWindowMinimized);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragOffsetRef.current = {
      offsetX: e.clientX - x,
      offsetY: e.clientY - y,
    };

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const desktop = document.getElementById("desktop");
    if (!desktop || !windowRef.current) return;

    const desktopRect = desktop.getBoundingClientRect();
    const windowRect = windowRef.current.getBoundingClientRect();

    const rawX = e.clientX - dragOffsetRef.current.offsetX;
    const rawY = e.clientY - dragOffsetRef.current.offsetY;

    const minX = desktopRect.left;
    const minY = desktopRect.top;
    const maxX = desktopRect.right - windowRect.width;
    const maxY = desktopRect.bottom - windowRect.height;

    const newX = Math.max(minX, Math.min(rawX, maxX));
    const newY = Math.max(minY, Math.min(rawY, maxY));

    changePosition(id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="flex-col h-[600px] w-[1024px] min-w-3xl min-h-[600px] bg-panel absolute rounded-sm resize overflow-auto"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        display: isWindowMinimized(id) ? "none" : "flex",
      }}
      ref={windowRef}
    >
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
      <div className="h-full w-full px-2">{children}</div>
    </div>
  );
}

export default Window;
