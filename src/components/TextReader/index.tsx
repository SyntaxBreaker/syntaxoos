import Markdown from "marked-react";
import { useTextStore } from "../../store/textStore";

function TextReader() {
  const content = useTextStore((state) => state.content);
  const fileFormat = useTextStore((state) => state.fileFormat);

  if (fileFormat === "md") {
    return (
      <div className="text-gray-200 py-2">
        <Markdown>{content}</Markdown>
      </div>
    );
  }

  return (
    <div className="py-2">
      <p className="text-gray-200 text-sm leading-6">{content}</p>
    </div>
  );
}

export default TextReader;
