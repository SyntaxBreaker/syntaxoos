import Markdown from "marked-react";
import { useTextStore } from "../../store/textStore";

function TextReader() {
  const content = useTextStore((state) => state.content);
  const fileFormat = useTextStore((state) => state.fileFormat);

  return (
    <article className="py-2">
      {fileFormat === "md" ? (
        <div className="text-gray-200 py-2">
          <Markdown>{content}</Markdown>
        </div>
      ) : (
        <pre className="text-gray-200 text-sm leading-6">{content}</pre>
      )}
    </article>
  );
}

export default TextReader;
