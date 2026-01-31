import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSequenceHero from "./ScrollSequenceHero";
import ClothingScroll from "./ClothingScroll";
import logo from "./assets/logo.svg";
import pause from "./assets/pause.svg";
import Products from "./Products";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ imageUrls }) {
  const navRef = useRef(null);
  const heroTextRef = useRef(null);
  const chevronRef = useRef(null);

  const [showProducts, setShowProducts] = useState(false);
  const productsRef = useRef(null);

  // Animate the products dropdown
  useEffect(() => {
    if (productsRef.current) {
      if (showProducts) {
        gsap.to(productsRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(productsRef.current, {
          y: -50,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    }
  }, [showProducts]);

  useEffect(() => {
    if (chevronRef.current) {
      if (showProducts) {
        gsap.to(chevronRef.current, {
          rotate: 180, // rotate 180° to point upwards
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(chevronRef.current, {
          rotate: 0, // rotate back to original pointing down
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [showProducts]);

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
      {/* NAVBAR */}
      <header ref={navRef} className="fixed top-0 z-50 w-full">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:pl-14 md:pr-8 md:py-4 transition-colors duration-300 ${
            showProducts ? "bg-white " : ""
          }`}
        >
          {/* LEFT LINKS (DESKTOP ONLY) */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 text-sm tracking-wide">
              <a
                href="#"
                className="tracking-wider relative flex items-center gap-1"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={() => setShowProducts(false)}
              >
                PRODUCTS
                <svg
                  ref={chevronRef}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>

              <a href="#" className="tracking-wider">
                PRICING
              </a>
              <a href="#" className="tracking-wider">
                BLOG
              </a>
            </div>
          </div>

          {/* LOGO */}
          <div className="flex items-center justify-center">
            <img src={logo} className="w-28 h-9 md:w-36 md:h-12" alt="Logo" />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 h-9">
            {/* WATCH DEMO (DESKTOP ONLY) */}
            <button className="hidden md:flex items-center gap-2 rounded-full tracking-widest border border-gray-200 px-4 py-2 text-sm bg-white">
              WATCH DEMO
              <img
                src={pause}
                alt=""
                className="w-5 h-5 p-0.5 bg-gray-300 rounded-full"
              />
            </button>

            {/* START FOR FREE */}
            <button className="rounded-full tracking-widest bg-green-950 px-3 md:px-6 py-2 text-xs md:text-sm text-white">
              START FOR FREE
            </button>

            {/* HAMBURGER (MOBILE ONLY) */}
            <button className="md:hidden flex flex-col justify-between w-5 h-4 mt-[1px]">
              <span className="block h-[2px] w-full bg-black"></span>
              <span className="block h-[2px] w-full bg-black"></span>
              <span className="block h-[2px] w-full bg-black"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* PRODUCTS DROPDOWN (DESKTOP ONLY) */}
      <div
        ref={productsRef}
        className="hidden md:block fixed top-18 inset-0 z-60 bg-white"
        style={{
          paddingTop: "64px",
          opacity: 0,
          transform: "translateY(-50px)",
        }}
        onMouseEnter={() => setShowProducts(true)}
        onMouseLeave={() => setShowProducts(false)}
      >
        <Products />
      </div>

      {/* HERO TEXT */}
      <div
        ref={heroTextRef}
        className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center pt-20 md:pt-16 px-4 text-center"
      >
        <h1 className="hero-heading text-black text-[30px] leading-tight font-semibold sm:font-medium sm:text-[36px] md:leading-tight">
          The single platform to iterate,
          <br className="hidden md:block" />
          evaluate, deploy, and monitor AI agents
        </h1>

        <div className="mt-6 md:mt-10">
          <p className="text-[12px] md:text-xs tracking-[0.2em]">TRUSTED BY</p>

          <div className="relative w-full overflow-hidden fade-edges pt-2 sm:pt-0">
            <ClothingScroll />
          </div>
        </div>
      </div>

      {/* SCROLL SEQUENCE */}
      <section className="relative h-screen">
        <ScrollSequenceHero imageUrls={imageUrls} />
      </section>
    </main>
  );
}
