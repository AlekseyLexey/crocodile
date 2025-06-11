import { useCallback } from "react";

export const useFloodFill = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const floodFill = useCallback(
    (x: number, y: number, fillColor: string) => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // Получаем данные изображения
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const data = imageData.data;

      // Цвет в точке клика
      const targetPos =
        (Math.round(y) * canvasRef.current.width + Math.round(x)) * 4;
      const targetColor = {
        r: data[targetPos],
        g: data[targetPos + 1],
        b: data[targetPos + 2],
        a: data[targetPos + 3],
      };

      // Цвет заливки в RGB
      const fillRgb = hexToRgb(fillColor);

      // Если кликнули на тот же цвет - ничего не делаем
      if (colorsMatch(targetColor, fillRgb)) return;

      // Реализация алгоритма заливки с затравкой
      const pixelsToCheck = [{ x: Math.round(x), y: Math.round(y) }];
      const width4 = canvasRef.current.width * 4;
      const height = canvasRef.current.height;

      while (pixelsToCheck.length > 0) {
        const pixel = pixelsToCheck.pop();
        if (!pixel) continue;

        const currentX = pixel.x;
        const currentY = pixel.y;
        const currentPos = (currentY * canvasRef.current.width + currentX) * 4;

        // Проверка границ
        if (
          currentX < 0 ||
          currentX >= canvasRef.current.width ||
          currentY < 0 ||
          currentY >= height
        ) {
          continue;
        }

        // Проверка цвета пикселя
        if (
          !colorsMatch(
            {
              r: data[currentPos],
              g: data[currentPos + 1],
              b: data[currentPos + 2],
              a: data[currentPos + 3],
            },
            targetColor
          )
        ) {
          continue;
        }

        // Заливаем пиксель
        data[currentPos] = fillRgb.r;
        data[currentPos + 1] = fillRgb.g;
        data[currentPos + 2] = fillRgb.b;
        data[currentPos + 3] = 255;

        // Добавляем соседние пиксели
        pixelsToCheck.push({ x: currentX + 1, y: currentY });
        pixelsToCheck.push({ x: currentX - 1, y: currentY });
        pixelsToCheck.push({ x: currentX, y: currentY + 1 });
        pixelsToCheck.push({ x: currentX, y: currentY - 1 });
      }

      // Обновляем изображение
      ctx.putImageData(imageData, 0, 0);
    },
    [canvasRef]
  );

  return { floodFill };
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function colorsMatch(
  color1: { r: number; g: number; b: number; a: number },
  color2: { r: number; g: number; b: number }
) {
  return (
    color1.r === color2.r && color1.g === color2.g && color1.b === color2.b
  );
}
