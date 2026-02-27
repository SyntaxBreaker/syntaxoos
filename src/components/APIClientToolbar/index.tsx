import APIClientMethodSelector from "../APIClientMethodSelector";
import APIClientAddressBar from "../APIClientAddressBar";
import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientToolbar() {
  const sendRequest = useAPIClientStore((state) => state.sendRequest);

  const handleRequest = (event: React.FormEvent) => {
    event.preventDefault();
    sendRequest();
  };

  return (
    <form onSubmit={handleRequest} className="flex gap-2">
      <div className="flex flex-row w-full">
        <APIClientMethodSelector />
        <APIClientAddressBar />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-600 hover:cursor-pointer"
      >
        Send
      </button>
    </form>
  );
}

export default APIClientToolbar;
