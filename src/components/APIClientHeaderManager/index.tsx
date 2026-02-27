import plusIcon from "../../assets/icons/plus.svg";
import { useAPIClientStore } from "../../store/APIClientStore";
import APIClientHeaderTable from "../APIClientHeaderTable";

function APIClientHeaderManager() {
  const addHeader = useAPIClientStore((state) => state.addHeader);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between items-center">
        <p className="text-xs text-gray-200 font-semibold">Header List</p>
        <button className="hover:cursor-pointer" onClick={addHeader}>
          <img src={plusIcon} alt="Add a new header" />
        </button>
      </div>
      <APIClientHeaderTable />
    </div>
  );
}

export default APIClientHeaderManager;
