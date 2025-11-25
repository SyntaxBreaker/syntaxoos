import { useImageStore } from "../../store/imageStore";

function ImageViewer() {
  const imageSrc = useImageStore((state) => state.imageSrc);

  if (!imageSrc) return;

  return <img src={imageSrc} alt="" className="w-lg h-lg mx-auto my-[36px]" />;
}

export default ImageViewer;
