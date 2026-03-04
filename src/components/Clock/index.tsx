import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="text-gray-200 text-sm tabular-nums">
      {time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}
    </time>
  );
}

export default Clock;
