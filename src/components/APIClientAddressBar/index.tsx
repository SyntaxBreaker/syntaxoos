import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientAddressBar() {
  const url = useAPIClientStore((state) => state.url);
  const updateURL = useAPIClientStore((state) => state.setURL);

  return (
    <input
      type="text"
      name="url"
      value={url}
      onChange={(event) => updateURL(event.target.value)}
      placeholder="Enter a URL..."
      className="w-full p-2 border-y border-r border-gray-600 rounded-r-md text-gray-200 focus:outline-2 focus:outline-gray-400"
    />
  );
}

export default APIClientAddressBar;
