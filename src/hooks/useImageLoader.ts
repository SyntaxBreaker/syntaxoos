import { useEffect, useState } from "react";

interface useImageLoaderProps {
  imageUrl: string;
}

function useImageLoader({ imageUrl }: useImageLoaderProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImage(img);
  }, [imageUrl]);

  return image;
}

export default useImageLoader;
