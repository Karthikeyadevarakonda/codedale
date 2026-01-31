import { useEffect, useRef, useState } from "react";
import { useScrollSequence } from "./hooks/useScrollSequence";

export default function ScrollSequenceHero({ imageUrls }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const total = imageUrls.length;

  const progress = Math.min(100, Math.round((loadedCount / total) * 100));

  /* -------- Preload images with REAL progress -------- */
  useEffect(() => {
    if (!imageUrls?.length) return;

    const imgs = new Array(imageUrls.length);

    imageUrls.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        imgs[i] = img;
        setLoadedCount((c) => c + 1);

        if (imgs.filter(Boolean).length === imageUrls.length) {
          setImages(imgs);
        }
      };
    });
  }, [imageUrls]);

  useScrollSequence(canvasRef, sectionRef, images);

  return (
    <>
      {/* PINNED SCROLL SEQUENCE */}
      <section ref={sectionRef} className="relative w-full bg-black h-[220dvh]">
        <div className="sticky top-0 h-[100dvh] w-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none"
          />
        </div>

        {/* Loader */}
        <div
          className={`fixed inset-0 z-50 bg-[#f6f7f2] transition-opacity duration-700 ${
            progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="absolute bottom-6 left-6 text-[72px] font-light text-black/30 leading-none">
            {progress}
          </div>
        </div>
      </section>

      {/* RELEASED NEXT SECTION */}
    </>
  );
}
