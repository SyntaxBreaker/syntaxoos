import APIClientBodyEditor from "../APIClientBodyEditor";
import APIClientBodyTypeSelector from "../APIClientBodyTypeSelector";

function APIClientBodyManager() {
  return (
    <div className="flex flex-col gap-4 min-h-full">
      <APIClientBodyTypeSelector />
      <APIClientBodyEditor />
    </div>
  );
}

export default APIClientBodyManager;
