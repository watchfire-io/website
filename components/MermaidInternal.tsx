"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#e07040",
    primaryTextColor: "#f4f4f5",
    primaryBorderColor: "#e07040",
    lineColor: "#e07040",
    secondaryColor: "#1a1d24",
    tertiaryColor: "#22262f",
    background: "#16181d",
    mainBkg: "#1a1d24",
    nodeBorder: "#e07040",
    clusterBkg: "#22262f",
    clusterBorder: "#2d3140",
    titleColor: "#f4f4f5",
    edgeLabelBackground: "#1a1d24",
  },
});

let renderCount = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const id = `mermaid-${++renderCount}`;
    mermaid.render(id, chart).then(({ svg }) => setSvg(svg));
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
