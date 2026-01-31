import { useEffect, useRef, useState } from "react";
import { useScrollSequence } from "./hooks/useScrollSequence";

export default function ScrollSequenceHero({ imageUrls }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  /* -------- Preload images -------- */
  useEffect(() => {
    if (!imageUrls || !imageUrls.length) return;

    const loaded = [];
    let done = 0;

    imageUrls.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded[i] = img;
        done++;
        if (done === imageUrls.length) {
          setImages(loaded);
        }
      };
    });
  }, [imageUrls]);

  /* -------- Scroll-driven sequence -------- */
  useScrollSequence(canvasRef, sectionRef, images, {
    smoothing: 0.12,
    maxBlurLayers: 4,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gray-100 overscroll-none"
      style={{ height: `${images.length * 3}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-screen overflow-hidden">
        {/* Canvas layer */}
        <canvas
          ref={canvasRef}
          className="absolute sm:inset-0 h-full w-full bg-black pointer-events-none"
        />
      </div>
    </section>
  );
}
