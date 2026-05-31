"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  {
    ssr: false,
  }
);

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

export default function GraphView({ searchQuery = "" }: { searchQuery?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(Boolean(backendUrl));
  const [error, setError] = useState(!backendUrl);
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    if (!backendUrl) {
      return;
    }

    fetch(`${backendUrl}/graph`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load graph data.");
        }

        return res.json();
      })
      .then((data) => {
        setGraphData(data);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[265px] overflow-hidden rounded-lg bg-zinc-950">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
          Loading network graph...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-red-400">
          Graph data unavailable
        </div>
      )}
      {!isLoading && !error && width > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={width}
          height={265}
          backgroundColor="#09090b"
          nodeLabel="id"
          nodeColor={(node) =>
            searchQuery && String(node.id).toLowerCase().includes(searchQuery)
              ? "#fbbf24"
              : "#ef4444"
          }
          linkColor={() => "#52525b"}
          nodeRelSize={8}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
        />
      )}
    </div>
  );
}
