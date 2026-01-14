import { SYSTEM_INFO } from "../../constants";
import SystemInfoItem from "../SystemInfoItem";

function SystemInfoList() {
  return (
    <div className="flex flex-col gap-2 text-white">
      <h2 className="text-sm">System Info</h2>
      {SYSTEM_INFO.map((info, id) => (
        <SystemInfoItem key={id} label={info} />
      ))}
    </div>
  );
}

export default SystemInfoList;
