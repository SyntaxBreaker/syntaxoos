import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-gray-200 text-sm">{time.toLocaleTimeString("en-US")}</p>
  );
}

export default Clock;
