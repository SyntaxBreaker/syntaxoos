import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientBodyTypeSelector() {
  const bodyContentType = useAPIClientStore((state) => state.bodyContentType);
  const setBodyContentType = useAPIClientStore(
    (state) => state.setBodyContentType,
  );

  return (
    <div className="flex flex-row gap-4 items-center">
      <p className="text-xs text-gray-200 font-semibold">Content Type</p>
      <select
        className="max-w-xs p-0.5 border-y border-x border-gray-600 rounded-md text-gray-200 focus:outline focus:outline-gray-400 hover:cursor-pointer hover:outline-offset-4"
        value={bodyContentType}
        onChange={(event) => setBodyContentType(event.target.value)}
      >
        <option value="application/json">application/json</option>
        <option value="application/xml">application/xml</option>
        <option value="text/plain">text/plain</option>
      </select>
    </div>
  );
}

export default APIClientBodyTypeSelector;
