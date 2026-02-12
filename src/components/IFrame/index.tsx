interface IFrameProps {
  src: string;
}

function IFrame({ src }: IFrameProps) {
  return (
    <iframe
      src={src}
      sandbox="allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigation-by-user-activation"
      className="h-full w-full"
    ></iframe>
  );
}

export default IFrame;
