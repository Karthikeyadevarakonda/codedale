import { useEffect, useRef, useState } from "react";
import { useScrollSequence } from "./hooks/useScrollSequence";

export default function ScrollSequenceHero({ imageUrls }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /* -------- Lock scroll while loading -------- */
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  /* -------- Preload images -------- */
  useEffect(() => {
    if (!imageUrls?.length) return;

    let cancelled = false;
    const loadedImages = new Array(imageUrls.length);
    let done = 0;

    imageUrls.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (cancelled) return;
        loadedImages[i] = img;
        done++;
        if (done === imageUrls.length) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  /* -------- Scroll sequence -------- */
  useScrollSequence(canvasRef, sectionRef, images, {
    smoothing: 0.12,
    maxBlurLayers: 4,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overscroll-none h-[190dvh] sm:h-[400dvh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] w-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />
      </div>

      {/* Optional loader */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          Loading…
        </div>
      )}
    </section>
  );
}
