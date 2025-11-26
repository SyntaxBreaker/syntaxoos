import { useTextStore } from "../../store/textStore";

function TextReader() {
  const content = useTextStore((state) => state.content);

  return (
    <div className="py-2">
      <p className="text-white text-sm leading-6">{content}</p>
    </div>
  );
}

export default TextReader;
