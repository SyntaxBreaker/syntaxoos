interface WindowTitleProps {
  title: string | null;
}

function WindowTitle({ title }: WindowTitleProps) {
  return (
    <p className="text-gray-200 text-sm font-bold select-none">
      {title ?? "Untitled"}
    </p>
  );
}

export default WindowTitle;
