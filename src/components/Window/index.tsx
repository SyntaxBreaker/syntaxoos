interface WindowProps {
  x: number;
  y: number;
  name: string;
  children: React.ReactNode;
}

function Window({ x, y, name, children }: WindowProps) {
  return (
    <div
      className="flex flex-col gap-4 h-[640px] w-[640px] p-2 bg-panel absolute rounded-sm"
      style={{left: `${x}px`, top: `${y}px`}}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="text-white text-sm font-bold">{name}</p>
        <div className="flex flex-row gap-1">
          <div className="h-2 w-2 bg-green-600 rounded-xs"></div>
          <div className="h-2 w-2 bg-yellow-600 rounded-xs"></div>
          <div className="h-2 w-2 bg-red-600 rounded-xs"></div>
        </div>
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

export default Window;
