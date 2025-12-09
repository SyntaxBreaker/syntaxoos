import { useImageStore } from "../../store/imageStore";

function ImageViewer() {
  const imageSrc = useImageStore((state) => state.imageSrc);

  if (!imageSrc) return;

  return (
    <img
      src={imageSrc}
      alt=""
      className="max-w-full max-h-full object-contain block mx-auto"
    />
  );
}

export default ImageViewer;
