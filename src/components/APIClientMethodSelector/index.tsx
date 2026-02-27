import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientMethodSelector() {
  const setMethod = useAPIClientStore((state) => state.setMethod);

  return (
    <select
      className="max-w-xs p-2 border-y border-x border-gray-600 rounded-l-md text-gray-200 focus:outline focus:outline-gray-400 hover:cursor-pointer hover:outline-offset-4"
      defaultValue="GET"
      onChange={(event) => setMethod(event.target.value)}
    >
      <option value="GET" className="bg-transparent">
        GET
      </option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
      <option value="DELETE">DELETE</option>
    </select>
  );
}

export default APIClientMethodSelector;
