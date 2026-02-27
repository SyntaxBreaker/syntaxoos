import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientResponse() {
  const response = useAPIClientStore((state) => state.response);

  if (!response) return <div>No response...</div>;

  const isJSON = typeof response.data === "object" && response.data !== null;

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <p className="text-xs text-gray-200">
        Status: <span className="text-green-400">{response.status}</span>
      </p>
      <div className="rounded-lg border border-gray-800 bg-gray-800 p-4 shadow-inner text-gray-200">
        {isJSON ? (
          <pre className="font-mono whitespace-pre-wrap break-all">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        ) : (
          <pre>{String(response.data)}</pre>
        )}
      </div>
    </div>
  );
}

export default APIClientResponse;
