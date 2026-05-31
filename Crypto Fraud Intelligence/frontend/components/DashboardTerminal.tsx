"use client";

import {
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GraphView from "@/components/GraphView";

export type Stats = {
  total_transactions: number;
  total_anomalies: number;
  total_communities: number;
  average_risk_score: number;
};

export type RiskTransaction = {
  transaction: string;
  risk_score: number;
};

export type Community = {
  community_id: string | number;
  size: number;
};

export type Centrality = {
  Transaction: string;
  Centrality: number;
};

type DashboardTerminalProps = {
  stats: Stats;
  topRisk: RiskTransaction[];
  communities: Community[];
  centrality: Centrality[];
};

const navItems = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Risk Analysis", href: "#risk-analysis", icon: AlertTriangle },
  { label: "Communities", href: "#communities", icon: Users },
  { label: "Network Graph", href: "#network-graph", icon: Share2 },
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
];

const pieColors = ["#ef4444", "#27272a"];

export default function DashboardTerminal({
  stats,
  topRisk,
  communities,
  centrality,
}: DashboardTerminalProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const matchingRisk = useMemo(
    () =>
      topRisk.filter((item) =>
        String(item.transaction).toLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery, topRisk],
  );
  const matchingCentrality = useMemo(
    () =>
      centrality.filter((item) =>
        String(item.Transaction).toLowerCase().includes(normalizedQuery),
      ),
    [centrality, normalizedQuery],
  );

  const visibleRisk = (normalizedQuery ? matchingRisk : topRisk).slice(0, 8);
  const visibleCentrality = (
    normalizedQuery ? matchingCentrality : centrality
  ).slice(0, 5);
  const totalSearchMatches = matchingRisk.length + matchingCentrality.length;
  const riskChartData = visibleRisk.map((item, index) => ({
    name: `TX ${index + 1}`,
    risk: Number((item.risk_score * 100).toFixed(2)),
  }));
  const anomalyDistribution = [
    { name: "Flagged", value: stats.total_anomalies },
    {
      name: "Observed",
      value: Math.max(stats.total_transactions - stats.total_anomalies, 0),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <aside className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 lg:h-screen lg:w-52 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-3">
        <div className="mb-5 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
            <Share2 size={19} />
          </div>
          <div>
            <p className="text-sm font-bold">CFI Terminal</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Intel Suite</p>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
          {navItems.map(({ label, href, icon: Icon }, index) => (
            <a
              key={label}
              href={href}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-zinc-900 hover:text-white ${
                index === 0 ? "bg-zinc-900 text-white" : "text-zinc-400"
              }`}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-8 hidden rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 lg:block">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">System</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Monitoring Active
          </p>
        </div>
      </aside>

      <main id="dashboard" className="min-w-0 flex-1 px-4 py-4 lg:px-5">
        <header className="mb-4 flex flex-col justify-between gap-3 border-b border-zinc-800 pb-3 md:flex-row md:items-end">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Intelligence Terminal
            </p>
            <h1 className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-3xl font-extrabold text-transparent">
              Crypto Fraud Intelligence
            </h1>
          </div>
          <label className="relative block w-full md:w-80">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search wallet or transaction ID"
              className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
            />
          </label>
        </header>

        {normalizedQuery && (
          <p className="mb-3 text-xs text-zinc-400">
            {totalSearchMatches > 0
              ? `${totalSearchMatches} matching analytics records for "${query.trim()}"`
              : `No transaction or wallet-like identifier matches "${query.trim()}".`}
          </p>
        )}

        <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <MetricCard label="Transactions" value={stats.total_transactions} />
          <MetricCard label="Anomalies" value={stats.total_anomalies} accent="text-red-400" />
          <MetricCard label="Communities" value={stats.total_communities} accent="text-orange-400" />
          <MetricCard
            label="Average Risk"
            value={`${(stats.average_risk_score * 100).toFixed(2)}%`}
            accent="text-yellow-400"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Panel id="risk-analysis" title="Risk Exposure Profile" eyebrow="Risk Analysis">
            {riskChartData.length > 0 ? (
              <div className="h-[265px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskChartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.38} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#27272a" />
                    <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
                      itemStyle={{ color: "#f87171" }}
                      formatter={(value) => [`${Number(value).toFixed(2)}%`, "Risk"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="risk"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fill="url(#riskGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyResult />
            )}
          </Panel>

          <Panel id="network-graph" title="Fraud Network Visualization" eyebrow="Network Graph">
            <GraphView searchQuery={normalizedQuery} />
          </Panel>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Panel id="communities" title="Community Analysis" eyebrow="Communities">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="border-b border-zinc-800 pb-2 text-left font-medium">Community ID</th>
                  <th className="border-b border-zinc-800 pb-2 text-right font-medium">Size</th>
                </tr>
              </thead>
              <tbody>
                {communities.slice(0, 5).map((item) => (
                  <tr key={item.community_id} className="border-b border-zinc-800/70">
                    <td className="py-2 font-mono text-zinc-300">{item.community_id}</td>
                    <td className="py-2 text-right font-semibold">{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Centrality Intelligence" eyebrow="Top Nodes">
            {visibleCentrality.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="border-b border-zinc-800 pb-2 text-left font-medium">Transaction</th>
                    <th className="border-b border-zinc-800 pb-2 text-right font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCentrality.map((item) => (
                    <tr key={item.Transaction} className="border-b border-zinc-800/70">
                      <td className="max-w-44 truncate py-2 font-mono text-zinc-300">{item.Transaction}</td>
                      <td className="py-2 text-right font-semibold text-orange-400">
                        {(item.Centrality * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyResult />
            )}
          </Panel>

          <Panel id="analytics" title="Alert Distribution" eyebrow="Analytics">
            <div className="h-[168px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={anomalyDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={2}
                  >
                    {anomalyDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs text-zinc-400">
              <Legend color="bg-red-500" label={`Flagged ${stats.total_anomalies}`} />
              <Legend
                color="bg-zinc-700"
                label={`Observed ${Math.max(stats.total_transactions - stats.total_anomalies, 0)}`}
              />
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent = "text-white",
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function Panel({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-4 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{eyebrow}</span>
      </div>
      {children}
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function EmptyResult() {
  return (
    <div className="flex h-[168px] items-center justify-center rounded-lg border border-dashed border-zinc-800 text-sm text-zinc-500">
      No matching analytics records
    </div>
  );
}
