interface BufferHellCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasHeight: number;
  canvasWidth: number;
}

function BufferHellCanvas({
  canvasRef,
  canvasHeight,
  canvasWidth,
}: BufferHellCanvasProps) {
  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
}

export default BufferHellCanvas;
