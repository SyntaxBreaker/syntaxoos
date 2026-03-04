import plusIcon from "../../assets/icons/plus.svg";
import { useAPIClientStore } from "../../store/APIClientStore";
import APIClientHeaderTable from "../APIClientHeaderTable";

function APIClientHeaderManager() {
  const addHeader = useAPIClientStore((state) => state.addHeader);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-row gap-4 justify-between items-center">
        <p className="text-xs text-gray-200 font-semibold">Header List</p>
        <button className="hover:cursor-pointer" onClick={addHeader}>
          <img src={plusIcon} alt="Add a new header" />
        </button>
      </header>
      <APIClientHeaderTable />
    </section>
  );
}

export default APIClientHeaderManager;
