import { useEffect, useState } from "react";

const IterateCard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <a className="col-span-1 py-12" href="/iterate">
      <div
        className={`
          group flex aspect-[5/3] min-h-32 w-[230px]
          transition-opacity duration-700
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="relative aspect-square h-full min-h-32">
          {[
            {
              top: "0%",
              left: "20%",
              h: "50%",
              r1: "rotate-180",
              r2: "rotate-[360deg]",
            },
            {
              top: "5%",
              left: "75%",
              h: "20%",
              r1: "rotate-[120deg]",
              r2: "rotate-[240deg]",
            },
            {
              top: "35%",
              left: "0%",
              h: "35%",
              r1: "rotate-[90deg]",
              r2: "rotate-[180deg]",
            },
            {
              top: "35%",
              left: "25%",
              h: "65%",
              r1: "rotate-[270deg]",
              r2: "rotate-[360deg]",
            },
          ].map((pos, i) => (
            <div
              key={i}
              className="
                absolute flex aspect-square items-center justify-center
                transition-transform duration-1000 ease-out
                group-hover:scale-110
              "
              style={{ top: pos.top, left: pos.left, height: pos.h }}
            >
              <div className="absolute -inset-1/6">
                <svg
                  viewBox="0 0 64 64"
                  className={`
                    absolute inset-0
                    transform-gpu origin-center
                    transition-transform duration-[3200ms] ease-linear
                    group-hover:${pos.r1}
                  `}
                  strokeWidth="1"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <svg
                  viewBox="0 0 64 64"
                  className={`
                    absolute inset-0
                    transform-gpu origin-center
                    transition-transform duration-[2400ms] ease-linear
                    group-hover:${pos.r2}
                  `}
                  strokeWidth="1"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div
                className="
                  absolute -inset-[calc(5%+12px)]
                  transform-gpu origin-center
                  transition-transform duration-700 ease-out
                  group-hover:rotate-45
                "
              >
                <svg
                  viewBox="0 0 64 64"
                  stroke="currentColor"
                  className="absolute inset-0"
                  strokeWidth="1"
                >
                  <path
                    d="M28 32h8M32 28v8"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          <div className="absolute top-[36%] -left-6 flex -translate-y-1/2 items-center gap-2">
            <div
              className="
                flex h-6 w-6 items-center justify-center
                rounded-full bg-green-200 text-green-900 hover:bg-black hover:text-white
                text-xs font-bold
                transition-transform duration-500
                group-hover:scale-110
              "
            >
              1
            </div>
            <div className="font-mono text-sm">Iterate</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default IterateCard;
