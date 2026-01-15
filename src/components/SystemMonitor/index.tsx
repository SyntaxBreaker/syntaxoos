import PerformanceMonitor from "../PerformanceMonitor";
import SystemInfoList from "../SystemInfoList";

function SystemMonitor() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 flex-wrap">
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="CPU"
          total={100}
          unit="%"
          value={21}
        />
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="Memory"
          total={32}
          unit="GB"
          value={10}
        />
        <PerformanceMonitor
          containerClassName="w-[calc(100%/3-11px)]"
          label="Disk"
          total={960}
          unit="GB"
          value={86}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between w-full">
        <SystemInfoList />
        <div className="flex flex-row gap-4 w-full justify-end">
          <PerformanceMonitor
            containerClassName="w-[314px]"
            label="Download"
            total={600}
            unit="MB"
            value={92}
          />
          <PerformanceMonitor
            containerClassName="w-[314px]"
            label="Upload"
            total={128}
            unit="MB"
            value={12}
          />
        </div>
      </div>
    </div>
  );
}

export default SystemMonitor;
