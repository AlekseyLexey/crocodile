export const getCursorPosition = (
  e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const rect = canvasRef.current.getBoundingClientRect();
  let clientX: number, clientY: number;
  
  if ('touches' in e) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return { x, y };
};