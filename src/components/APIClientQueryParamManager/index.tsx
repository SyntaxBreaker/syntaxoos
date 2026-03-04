import plusIcon from "../../assets/icons/plus.svg";
import { useAPIClientStore } from "../../store/APIClientStore";
import APIClientQueryParamTable from "../APIClientQueryParamTable";

function APIClientQueryParamManager() {
  const addParameter = useAPIClientStore((state) => state.addParameter);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-row gap-4 justify-between items-center">
        <p className="text-xs text-gray-200 font-semibold">Query parameters</p>
        <button className="hover:cursor-pointer" onClick={addParameter}>
          <img src={plusIcon} alt="Add a new parameter" />
        </button>
      </header>
      <APIClientQueryParamTable />
    </section>
  );
}

export default APIClientQueryParamManager;
