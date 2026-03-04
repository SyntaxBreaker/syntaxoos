import APIClientBodyEditor from "../APIClientBodyEditor";
import APIClientBodyTypeSelector from "../APIClientBodyTypeSelector";

function APIClientBodyManager() {
  return (
    <section className="flex flex-col gap-4 min-h-full">
      <APIClientBodyTypeSelector />
      <APIClientBodyEditor />
    </section>
  );
}

export default APIClientBodyManager;
