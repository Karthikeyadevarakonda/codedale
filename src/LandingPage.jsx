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

  const [showProducts, setShowProducts] = useState(false); // desktop hover menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile menu
  const productsRef = useRef(null);

  // Desktop products dropdown animation
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

  // Chevron rotation for desktop
  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotate: showProducts ? 180 : 0,
        duration: 0.3,
        ease: showProducts ? "power2.out" : "power2.in",
      });
    }
  }, [showProducts]);

  // Navbar and hero text scroll animations (unchanged)
  useEffect(() => {
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

    gsap.fromTo(
      heroTextRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.7,
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
    <main className="relative ">
      {/* NAVBAR */}
      <header ref={navRef} className="fixed top-0 z-50 w-full">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:pl-14 md:pr-8 md:py-4 transition-colors duration-300 ${
            showProducts ? "bg-white" : ""
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
            <button className="hidden md:flex items-center gap-2 rounded-full tracking-widest border border-gray-200 px-4 py-2 text-sm bg-white">
              WATCH DEMO
              <img
                src={pause}
                alt=""
                className="w-5 h-5 p-0.5 bg-gray-300 rounded-full"
              />
            </button>
            <button className="rounded-full tracking-widest bg-green-950 px-3 md:px-6 py-2 text-xs md:text-sm text-white">
              START FOR FREE
            </button>

            {/* HAMBURGER (MOBILE ONLY) */}
            <button
              className="md:hidden flex flex-col justify-between w-5 h-4 mt-[1px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="block h-[2px] w-full bg-black"></span>
              <span className="block h-[2px] w-full bg-black"></span>
              <span className="block h-[2px] w-full bg-black"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* DESKTOP PRODUCTS DROPDOWN */}
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

      {/* MOBILE MENU */}
      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-70 bg-[#f6f7f2] md:hidden p-6 flex flex-col h-[100dvh] overflow-y-auto ">
          {/* Header */}
          <div className="grid grid-cols-3 items-center">
            {/* Left: Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-3 w-28 justify-self-start "
            />

            {/* Center: CTA */}
            <button className="justify-self-center rounded  bg-green-900 text-white w-full py-2 text-xs ">
              START
            </button>

            {/* Right: Back button */}
            <button
              className="justify-self-end flex items-center text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src="/back.svg" alt="Back" className="w-5 h-5" />
            </button>
          </div>

          {/* Products section */}
          <div className="mt-5 border-b border-gray-200 ">
            <h2 className="text-2xl font-semibold text-black">Products</h2>
            <p className="text-sm text-gray-500 mt-1">Across your journey</p>

            <div className="mt-6 space-y-5 ">
              {/* Iterate */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/nav1.svg"
                    alt="Iterate"
                    className="w-8 h-8 animate-spin [animation-duration:10s]"
                  />
                  <div>
                    <p className="text-base font-medium">Iterate</p>
                    <p className="text-sm text-gray-500">
                      Sketch, test and refine
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>

              {/* Evaluate */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/nav2.svg"
                    alt="Evaluate"
                    className="w-8 h-8 animate-spin [animation-duration:10s]"
                  />
                  <div>
                    <p className="text-base font-medium">Evaluate</p>
                    <p className="text-sm text-gray-500">Reflect and measure</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>

              {/* Deploy */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/nav3.svg"
                    alt="Deploy"
                    className="w-8 h-8 animate-spin [animation-duration:10s]"
                  />
                  <div>
                    <p className="text-base font-medium">Deploy</p>
                    <p className="text-sm text-gray-500">From draft to live</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>

              {/* Monitor */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/nav4.svg"
                    alt="Monitor"
                    className="w-8 h-8 animate-spin [animation-duration:10s]"
                  />
                  <div>
                    <p className="text-base font-medium">Monitor</p>
                    <p className="text-sm text-gray-500">
                      Insights in real time
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-5 space-y-4">
            <p className="text-xl font-semibold">Pricing</p>
            <p className="text-xl font-semibold">Blog</p>
          </div>

          {/* Back button */}
        </div>
      )}

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
