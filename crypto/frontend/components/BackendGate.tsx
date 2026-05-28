"use client";

import { Activity, RefreshCw, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardTerminal, {
  type Centrality,
  type Community,
  type RiskTransaction,
  type Stats,
} from "@/components/DashboardTerminal";

type DashboardData = {
  stats: Stats;
  topRisk: RiskTransaction[];
  communities: Community[];
  centrality: Centrality[];
};

type Stage = "waking" | "loading" | "error";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
const healthAttempts = 6;

export default function BackendGate() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [stage, setStage] = useState<Stage>(backendUrl ? "waking" : "error");
  const [message, setMessage] = useState(
    backendUrl ? "" : "NEXT_PUBLIC_BACKEND_URL is not configured.",
  );
  const [seconds, setSeconds] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [restartToken, setRestartToken] = useState(0);

  useEffect(() => {
    if (!backendUrl) {
      return;
    }

    let active = true;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (active) {
        setSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }
    }, 1000);

    async function startDashboard() {
      for (let currentAttempt = 1; currentAttempt <= healthAttempts; currentAttempt += 1) {
        if (!active) {
          return;
        }

        setAttempt(currentAttempt);

        try {
          const response = await request("/health", 20000);

          if (!active) {
            return;
          }

          if (response.ok) {
            setStage("loading");

            const [stats, topRisk, communities, centrality] = await Promise.all([
              getData<Stats>("/stats"),
              getData<RiskTransaction[]>("/top-risk"),
              getData<Community[]>("/communities"),
              getData<Centrality[]>("/centrality"),
            ]);

            if (active) {
              window.clearInterval(timer);
              setData({ stats, topRisk, communities, centrality });
            }

            return;
          }
        } catch {
          // A sleeping Render service or transient network delay is retried below.
        }

        await wait(2000);
      }

      if (active) {
        window.clearInterval(timer);
        setMessage("The backend is taking longer than expected to start.");
        setStage("error");
      }
    }

    void startDashboard().catch(() => {
      if (active) {
        window.clearInterval(timer);
        setMessage("The backend started, but analytics data could not be loaded.");
        setStage("error");
      }
    });

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [restartToken]);

  function retry() {
    setData(null);
    setMessage("");
    setSeconds(0);
    setAttempt(0);
    setStage("waking");
    setRestartToken((value) => value + 1);
  }

  if (data) {
    return (
      <DashboardTerminal
        stats={data.stats}
        topRisk={data.topRisk}
        communities={data.communities}
        centrality={data.centrality}
      />
    );
  }

  return (
    <StartupScreen
      stage={stage}
      message={message}
      seconds={seconds}
      attempt={attempt}
      onRetry={retry}
    />
  );
}

async function request(path: string, timeout: number) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(`${backendUrl}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function getData<T>(path: string): Promise<T> {
  const response = await request(path, 20000);

  if (!response.ok) {
    throw new Error(`Unable to load ${path}.`);
  }

  return response.json();
}

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function StartupScreen({
  stage,
  message,
  seconds,
  attempt,
  onRetry,
}: {
  stage: Stage;
  message: string;
  seconds: number;
  attempt: number;
  onRetry: () => void;
}) {
  const isError = stage === "error";

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="hidden w-52 border-r border-zinc-800 bg-zinc-950 p-4 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
            <Share2 size={19} />
          </div>
          <div>
            <p className="text-sm font-bold">CFI Terminal</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Intel Suite</p>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-7 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            {isError ? <RefreshCw size={24} /> : <Activity size={24} className="animate-pulse" />}
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Backend Status</p>
          <h1 className="mt-3 text-xl font-semibold">
            {isError
              ? "Backend not available yet"
              : stage === "waking"
                ? "Starting analytics engine"
                : "Loading intelligence data"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {isError
              ? message
              : "Render may pause inactive services. A wake request has been sent and the dashboard will open automatically."}
          </p>
          {!isError && (
            <div className="mt-6 flex items-center justify-center gap-8 rounded-xl bg-zinc-950 px-4 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Waiting</p>
                <p className="mt-1 font-mono text-2xl text-orange-400">{formatDuration(seconds)}</p>
              </div>
              <div className="h-10 w-px bg-zinc-800" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Wake Request</p>
                <p className="mt-2 text-sm font-semibold text-zinc-200">Attempt {attempt || 1}</p>
              </div>
            </div>
          )}
          {isError && backendUrl && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-red-400"
            >
              <RefreshCw size={15} />
              Retry Backend Wake-Up
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
