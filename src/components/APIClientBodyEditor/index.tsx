import { useAPIClientStore } from "../../store/APIClientStore";

function APIClientBodyEditor() {
  const body = useAPIClientStore((state) => state.body);
  const setBody = useAPIClientStore((state) => state.setBody);

  return (
    <textarea
      className="min-h-[300px] outline-1 outline-gray-600 rounded-r-md text-gray-200 focus:outline-2 focus:outline-gray-400 p-2"
      value={body}
      onChange={(event) => setBody(event.target.value)}
    />
  );
}

export default APIClientBodyEditor;
