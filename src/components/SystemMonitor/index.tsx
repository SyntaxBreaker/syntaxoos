import { useEffect, useState } from "react";
import PerformanceMonitor from "../PerformanceMonitor";
import SystemInfoList from "../SystemInfoList";
import { RESOURCE_LIMITS } from "../../constants";

function SystemMonitor() {
  const [usage, setUsage] = useState({
    cpu: 21,
    download: 92,
    memory: 10,
    upload: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUsage({
        cpu: Math.floor(Math.random() * RESOURCE_LIMITS.cpu),
        download: Math.floor(Math.random() * RESOURCE_LIMITS.download),
        memory: Math.floor(Math.random() * RESOURCE_LIMITS.memory),
        upload: Math.floor(Math.random() * RESOURCE_LIMITS.upload),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 flex-wrap">
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="CPU"
          total={RESOURCE_LIMITS.cpu}
          unit="%"
          value={usage.cpu}
        />
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="Memory"
          total={RESOURCE_LIMITS.memory}
          unit="GB"
          value={usage.memory}
        />
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="Disk"
          total={RESOURCE_LIMITS.disk}
          unit="GB"
          value={60}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between w-full">
        <SystemInfoList />
        <div className="flex flex-row gap-4 w-full justify-end">
          <PerformanceMonitor
            containerClassName="w-[314px]"
            label="Download"
            total={RESOURCE_LIMITS.download}
            unit="MB"
            value={usage.download}
          />
          <PerformanceMonitor
            containerClassName="w-[314px]"
            label="Upload"
            total={RESOURCE_LIMITS.upload}
            unit="MB"
            value={usage.upload}
          />
        </div>
      </div>
    </div>
  );
}

export default SystemMonitor;
