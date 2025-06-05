import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

interface UseDominantColorProps {
  imageUrl: string;
}

const useDominantColor = ({ imageUrl }: UseDominantColorProps) => {
  const [color, setColor] = useState("#cccccc"); // fallback color

  useEffect(() => {
    if (!imageUrl) return;
    const fac = new FastAverageColor();
    fac
      .getColorAsync(imageUrl, { mode: "speed", crossOrigin: "anonymous" })
      .then((result) => {
        setColor(result.rgb);
      })
      .catch(() => {
        setColor("#cccccc");
      });
    // Cleanup
    return () => fac.destroy();
  }, [imageUrl]);

  return color;
};

export default useDominantColor;
