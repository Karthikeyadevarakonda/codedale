import { useEffect, useState } from "react";

const MonitorCard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <a className="col-span-1 py-12" href="/monitor">
      <div
        className={`group flex aspect-[5/3] min-h-32 w-[230px]
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative aspect-square h-full min-h-32">
          {[
            { top: "0%", left: "0%", h: "65%" },
            { top: "0%", left: "70%", h: "25%" },
            { top: "72%", left: "10%", h: "28%" },
            { top: "55%", left: "55%", h: "45%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="
                absolute flex aspect-square items-center justify-center
                transition-transform duration-2000 ease-out
                group-hover:scale-110
              "
              style={{ top: pos.top, left: pos.left, height: pos.h }}
            >
              <div className="absolute -inset-1/6">
                <svg
                  viewBox="0 0 64 64"
                  className="
                    absolute inset-0
                    transition-transform duration-[3000ms] ease-linear
                    group-hover:rotate-180
                  "
                  strokeWidth="1"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <svg
                  viewBox="0 0 64 64"
                  className="
                    absolute inset-0
                    transition-transform duration-[2200ms] ease-linear
                    group-hover:rotate-[360deg]
                  "
                  strokeWidth="1"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="5 3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div
                className="
                  absolute -inset-[calc(5%+12px)]
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
          <div className="absolute top-[40%] -left-8 flex -translate-y-1/2 items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-200 text-green-900 hover:bg-black hover:text-white text-xs font-bold transition-transform duration-500 group-hover:scale-110">
              4
            </div>
            <div className="font-mono text-sm">Monitor</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MonitorCard;
