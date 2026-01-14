interface PerformanceMonitorProps {
  containerClassName: string;
  label: string;
  total: number;
  unit: string;
  value: number;
}

function PerformanceMonitor({
  containerClassName,
  label,
  total,
  unit,
  value,
}: PerformanceMonitorProps) {
  if (label === "CPU" && (value < 0 || value > 100)) return null;

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.ceil((value / total) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (percentage: number) => {
    if (percentage > 85) {
      return "#ef4444";
    } else if (percentage > 60) {
      return "#f59e0b";
    } else {
      return "#10b981";
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 bg-[#313E41] ${containerClassName} h-xs p-4`}
    >
      <h2 className="text-white">{label}</h2>
      <div className="relative flex flex-col gap-8 items-center justify-center">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#C7C9C7"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={getColor(percentage)}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-white font-bold text-sm">
          {unit === "%" ? `${value}${unit}` : `${value}${unit}/${total}${unit}`}
        </span>
      </div>
    </div>
  );
}

export default PerformanceMonitor;
