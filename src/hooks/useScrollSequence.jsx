import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

export function useScrollSequence(canvasRef, sectionRef, images, options = {}) {
  const { smoothing = 0.12, maxBlurLayers = 4 } = options;
  const frameCount = images.length;

  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const lastDrawnFrame = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: document.documentElement,
    offset: ["start start", "end end"],
  });

  /* Scroll → target frame */
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      targetFrame.current = v * (frameCount - 1);
    });
  }, [scrollYProgress, frameCount]);

  /* Render loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !images.length) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    let rafId;

    const resize = () => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (frame) => {
      const index = Math.max(0, Math.min(frameCount - 1, Math.round(frame)));

      if (index === lastDrawnFrame.current) return;
      lastDrawnFrame.current = index;

      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;

      ctx.globalAlpha = 1;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      const img = images[index];
      if (!img) return;

      ctx.drawImage(img, 0, 0, w, h);

      const velocity = Math.abs(targetFrame.current - currentFrame.current);
      const layers = Math.min(Math.floor(velocity * 2), maxBlurLayers);

      for (let i = 0; i < layers; i++) {
        ctx.globalAlpha = 0.04;
        ctx.drawImage(img, 0, 0, w, h);
      }

      ctx.globalAlpha = 1;
    };

    const render = () => {
      const delta = targetFrame.current - currentFrame.current;

      if (Math.abs(delta) > 0.0005) {
        currentFrame.current += delta * smoothing;
      }

      drawFrame(currentFrame.current);
      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [images, frameCount, smoothing, maxBlurLayers, canvasRef]);
}
