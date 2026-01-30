import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import one from "./assets/one.svg";
import two from "./assets/two.svg";
import three from "./assets/three.svg";
import four from "./assets/four.svg";
import five from "./assets/five.svg";
import seven from "./assets/seven.svg";
import nine from "./assets/nine.svg";
import ten from "./assets/ten.svg";
import eleven from "./assets/eleven.svg";

const svgs = [one, two, three, four, five, seven, nine, ten, eleven];

export default function ClothingScroll() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative w-full flex justify-center overflow-hidden"
    >
      {/* Central container */}
      <div className="max-w-3xl w-full relative overflow-hidden">
        <motion.div
          className="flex gap-8 animate-scroll-left w-max"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {[...svgs, ...svgs].map((src, index) => (
            <div key={index} className="">
              <img
                src={src}
                alt=""
                className="w-36 h-36 sm:w-30 sm:h-25 object-contain"
                draggable="false"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-scroll-left {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}
