import WindowControlButtons from "../WindowControlButtons";

interface WindowTitleBarProps {
  dragOffsetRef: React.RefObject<{
    offsetX: number;
    offsetY: number;
  }>;
  id: number;
  windowName: string | null;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
}

function WindowTitleBar({
  dragOffsetRef,
  id,
  windowName,
  setIsDragging,
  x,
  y,
}: WindowTitleBarProps) {
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
      <p className="text-white text-sm font-bold select-none">{windowName}</p>
      <WindowControlButtons id={id} />
    </div>
  );
}

export default WindowTitleBar;
