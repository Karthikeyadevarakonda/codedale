import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSequenceHero from "./ScrollSequenceHero";
import ClothingScroll from "./ClothingScroll";
import logo from "./assets/logo.svg";
import pause from "./assets/pause.svg";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ imageUrls }) {
  const navRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    /* Navbar fade out */
    gsap.to(navRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top+=80",
        end: "top+=300 top",
        scrub: true,
      },
    });

    /* Hero text fade + lift */
    gsap.fromTo(
      heroTextRef.current,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 0.7, // shrink instead of moving up
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top top+=120",
          end: "bottom top+=100",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <main className="relative">
      <header ref={navRef} className="fixed top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between pl-14 pr-8 py-4">
          <div className="flex items-center gap-10">
            <div className="hidden md:flex gap-8 text-sm tracking-wide">
              <a className="tracking-wider " href="#">
                PRODUCTS
              </a>
              <a className="tracking-wider " href="#">
                PRICING
              </a>
              <a className="tracking-wider " href="#">
                BLOG
              </a>
            </div>
          </div>

          <div className="pl-10 ml-20">
            <img src={logo} className="w-38 h-10 " alt="Logo" />
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full tracking-widest border border-gray-200 px-4 py-2 text-sm bg-white">
              WATCH DEMO
              <img
                src={pause}
                alt=""
                className="w-5 h-5 p-0.5 bg-gray-300 rounded-full"
              />
            </button>

            <button className="rounded-full tracking-widest bg-green-950 px-6 py-2 text-sm text-white">
              START FOR FREE
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}

      <div
        ref={heroTextRef}
        className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center pt-16 px-6 text-center"
      >
        <h1 className="hero-heading text-black">
          The single platform to iterate,
          <br />
          evaluate, deploy, and monitor AI agents
        </h1>

        <div className="mt-10">
          <p className="text-xs tracking-[0.2em]">TRUSTED BY</p>

          <div className="relative w-full overflow-hidden fade-edges">
            <ClothingScroll />
          </div>
        </div>
      </div>
      <section className="relative h-screen">
        <ScrollSequenceHero imageUrls={imageUrls} />
      </section>
    </main>
  );
}
