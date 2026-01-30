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
      className="relative h-[500vh] bg-black overscroll-none"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Canvas layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-black pointer-events-none"
        />
      </div>
    </section>
  );
}
