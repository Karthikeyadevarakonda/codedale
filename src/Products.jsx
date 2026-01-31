// Products.jsx
import { useState } from "react";
import IterateCard from "./components/IterateCard";
import EvaluateCard from "./components/EvaluateCard";
import DeployCard from "./components/DeployCard";
import MonitorCard from "./components/MonitorCard";

const Products = () => {
  const [hovered, setHovered] = useState(null);

  const cards = [
    {
      id: "iterate",
      title: "Iterate",
      subtitle: "Sketch, test and refine",
      items: ["Editor", "Playground", "Datasets"],
      component: <IterateCard />,
    },
    {
      id: "evaluate",
      title: "Evaluate",
      subtitle: "Reflect and measure",
      items: ["Evaluations", "Datasets"],
      component: <EvaluateCard />,
    },
    {
      id: "deploy",
      title: "Deploy",
      subtitle: "From draft to live",
      items: ["Deployments", "Analytics", "Gateway ↗"],
      component: <DeployCard />,
    },
    {
      id: "monitor",
      title: "Monitor",
      subtitle: "Insights in real time",
      items: ["Logs", "Analytics"],
      component: <MonitorCard />,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center  p-0">
      {/* Cards Row */}
      <div className="flex flex-wrap justify-center gap-16 mb-12">
        {cards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
            className={`transition-opacity duration-300 ${
              hovered && hovered !== card.id ? "opacity-40" : "opacity-100"
            }`}
          >
            {card.component}
          </div>
        ))}
      </div>

      {/* Descriptions Row */}
      <div className="grid grid-cols-4 gap-16 max-w-6xl text-left">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`transition-opacity duration-300 ${
              hovered && hovered !== card.id ? "opacity-40" : "opacity-100"
            }`}
          >
            <h3 className="text-sm font-semibold uppercase text-gray-600">
              {card.title}
            </h3>
            <p className="mt-2 text-2xl font-medium text-gray-900">
              {card.subtitle}
            </p>
            <ul className="mt-2 text-gray-700 space-y-1">
              {card.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
