import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

/**
 * Custom hook to get the dominant color of an image.
 * @param {string} imageUrl
 * @returns {string} CSS color string (e.g., 'rgb(123, 45, 67)')
 */

export function useDominantColor(imageUrl) {
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
}
