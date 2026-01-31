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
      <header ref={navRef} className="fixed top-0 z-50 w-full">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between pl-14 pr-8 py-4 transition-colors duration-300 border-b-0 ${
            showProducts
              ? "bg-white border-b border-dashed border-gray-300"
              : ""
          }`}
        >
          <div className="flex items-center gap-10">
            <div className="hidden md:flex gap-8 text-sm tracking-wide ">
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
                  className="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6"></path>
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

      <div
        ref={productsRef}
        className="fixed top-18 inset-0 z-60 bg-white"
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
