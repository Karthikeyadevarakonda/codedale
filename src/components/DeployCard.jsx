import { useEffect, useState } from "react";

const DeployCard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <a className="col-span-1 py-12" href="/deploy">
      <div
        className={`
          relative group flex aspect-[5/3] min-h-32 w-[230px]
          transition-opacity duration-700
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="relative aspect-square h-full min-h-32">
          {[
            { top: "40%", left: "0%", h: "60%", d: "3000ms" },
            { top: "0%", left: "45%", h: "25%", d: "4200ms" },
            { top: "25%", left: "60%", h: "40%", d: "2600ms" },
            { top: "75%", left: "65%", h: "20%", d: "3600ms" },
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
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className={`
                    absolute inset-0
                    transform-gpu origin-center
                    transition-transform ease-linear
                    group-hover:rotate-[360deg]
                  `}
                  style={{ transitionDuration: pos.d }}
                  strokeWidth="1"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
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

        <div className="absolute top-2 right-8 flex items-center gap-2 ">
          <div
            className="
              flex h-6 w-6 items-center justify-center
              rounded-full bg-green-200 text-green-900 hover:bg-black hover:text-white
              text-xs font-bold
              transition-transform duration-500
              group-hover:scale-110
            "
          >
            3
          </div>
          <div className="font-mono text-sm uppercase">DEPLOY</div>
        </div>
      </div>
    </a>
  );
};

export default DeployCard;
