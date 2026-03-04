interface WindowTitleProps {
  title: string | null;
}

function WindowTitle({ title }: WindowTitleProps) {
  return (
    <h2 className="text-gray-200 text-sm font-bold select-none">
      {title ?? "Untitled"}
    </h2>
  );
}

export default WindowTitle;
