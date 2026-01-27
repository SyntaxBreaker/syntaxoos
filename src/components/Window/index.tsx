import { useEffect, useRef, useState } from "react";
import { useWindowsStore } from "../../store/windowsStore";
import TitleBar from "../TitleBar";
import { useAudioStore } from "../../store/audioStore";
import { useImageStore } from "../../store/imageStore";
import { useTextStore } from "../../store/textStore";

interface WindowProps {
  id: number;
  x: number;
  y: number;
  windowName: string;
  children: React.ReactNode;
}

function Window({ id, x, y, windowName, children }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ offsetX: 0, offsetY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const changePosition = useWindowsStore((state) => state.changePosition);
  const isWindowMinimized = useWindowsStore((state) => state.isWindowMinimized);
  const audioFileName = useAudioStore((state) => state.audioFileName);
  const imageFileName = useImageStore((state) => state.imageFileName);
  const textFileName = useTextStore((state) => state.textFileName);

  const fileName = audioFileName || imageFileName || textFileName || null;

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
      <TitleBar
        dragOffsetRef={dragOffsetRef}
        id={id}
        windowName={windowName}
        setIsDragging={setIsDragging}
        x={x}
        y={y}
        fileName={fileName}
      />
      <div className="h-full w-full px-2 overflow-y-auto flex-grow">
        {children}
      </div>
    </div>
  );
}

export default Window;
