"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  TrendingUp, TrendingDown, Minus, Users, Building2,
  BedDouble, ArrowRight, PenLine, Plus,
} from "lucide-react";
import {
  loadReports, MONTHS, MONTHS_SHORT,
  formatNOK, formatNOKFull,
  type MonthReport,
} from "@/lib/data";

/* ─── Helpers ───────────────────────────────────────────────────────── */

function delta(curr: number, prev: number) {
  if (!prev) return null;
  return ((curr - prev) / prev) * 100;
}

function DeltaBadge({ curr, prev, suffix = "" }: { curr: number; prev: number; suffix?: string }) {
  const pct = delta(curr, prev);
  if (pct === null) return null;
  const up = pct >= 0;
  const Icon = Math.abs(pct) < 0.5 ? Minus : up ? TrendingUp : TrendingDown;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        background: up ? "#e8f5e9" : "#fdecea",
        color: up ? "#2e7d32" : "#c62828",
      }}
    >
      <Icon size={11} />
      {Math.abs(pct).toFixed(1)}{suffix}
    </span>
  );
}

/* ─── KPI Card ──────────────────────────────────────────────────────── */

function KpiCard({
  label, value, prev, prevLabel, icon, format,
}: {
  label: string;
  value: number;
  prev?: number;
  prevLabel?: string;
  icon: React.ReactNode;
  format: (v: number) => string;
}) {
  return (
    <div
      className="p-5 flex flex-col gap-3"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-label)" }}>
          {label}
        </span>
        <span style={{ color: "var(--color-muted)" }}>{icon}</span>
      </div>
      <div>
        <p className="text-3xl font-bold leading-none mb-2">{format(value)}</p>
        {prev !== undefined && (
          <div className="flex items-center gap-2">
            <DeltaBadge curr={value} prev={prev} suffix="%" />
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>
              vs {prevLabel}: {format(prev)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

const AVAILABLE = [
  { year: 2026, month: 3 },
  { year: 2026, month: 2 },
  { year: 2026, month: 1 },
];

export default function Dashboard() {
  const [reports, setReports] = useState<MonthReport[]>([]);
  const [selected, setSelected] = useState<{ year: number; month: number }>({ year: 2026, month: 3 });

  useEffect(() => {
    setReports(loadReports());
  }, []);

  const current = reports.find((r) => r.year === selected.year && r.month === selected.month);
  const prev = reports.find((r) => r.year === selected.year - 1 && r.month === selected.month);

  // Revenue chart — all months for selected year + compare year
  const compareYear = selected.year - 1;
  const revenueChart = MONTHS_SHORT.map((m, i) => {
    const thisYr = reports.find((r) => r.year === selected.year && r.month === i + 1);
    const lastYr = reports.find((r) => r.year === compareYear && r.month === i + 1);
    return {
      name: m,
      [selected.year]: thisYr?.omsetning ?? null,
      [compareYear]: lastYr?.omsetning ?? null,
    };
  });

  // Occupancy chart
  const occupancyChart = MONTHS_SHORT.map((m, i) => {
    const thisYr = reports.find((r) => r.year === selected.year && r.month === i + 1);
    const lastYr = reports.find((r) => r.year === compareYear && r.month === i + 1);
    return {
      name: m,
      [selected.year]: thisYr?.beleggPct ?? null,
      [compareYear]: lastYr?.beleggPct ?? null,
    };
  });

  if (!current) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "var(--color-bg)" }}>
        <p style={{ color: "var(--color-muted)" }}>Laster data…</p>
      </div>
    );
  }

  const monthLabel = `${MONTHS[current.month - 1]} ${current.year}`;
  const prevMonthLabel = prev ? `${MONTHS[prev.month - 1]} ${prev.year}` : undefined;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <header
        className="px-8 py-3 flex items-center justify-between sticky top-0 z-10"
        style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
      >
        <nav className="flex items-center gap-1">
          <span
            className="text-sm px-3 py-1.5 rounded-md font-medium"
            style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
          >
            Dashboard
          </span>
          <Link
            href="/input"
            className="text-sm px-3 py-1.5 rounded-md transition-opacity hover:opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            Legg inn data
          </Link>
        </nav>
      </header>

      {/* ── Plus button (fixed) ──────────────────────────────────────── */}
      <Link
        href="/input"
        title="Ny månedsrapport"
        className="fixed bottom-6 right-6 z-20 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-opacity hover:opacity-80"
        style={{ background: "var(--color-btn-primary)", color: "var(--color-btn-primary-fg)" }}
      >
        <Plus size={20} strokeWidth={2.5} />
      </Link>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* ── Logo + title ─────────────────────────────────────────────── */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <Image src="/finse-logo.png" alt="Hotel Finse 1222" height={48} width={200} className="object-contain object-left mb-3" style={{ height: 48, width: "auto" }} />
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-label)" }}>
              Månedsrapport
            </p>
            <h1 className="text-2xl font-bold">{monthLabel}</h1>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {AVAILABLE.map(({ year, month }) => {
              const active = selected.year === year && selected.month === month;
              return (
                <button
                  key={`${year}-${month}`}
                  onClick={() => setSelected({ year, month })}
                  className="text-sm px-3 py-1.5 font-medium transition-all"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    ...(active
                      ? { background: "var(--color-btn-primary)", color: "var(--color-btn-primary-fg)" }
                      : { border: "1px solid var(--color-border)", color: "var(--color-text)", background: "transparent" }),
                  }}
                >
                  {MONTHS_SHORT[month - 1]} {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── KPI row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard
            label="Omsetning"
            value={current.omsetning}
            prev={prev?.omsetning}
            prevLabel={prevMonthLabel}
            icon={<Building2 size={16} />}
            format={formatNOK}
          />
          <KpiCard
            label="Beleggsprosent"
            value={current.beleggPct}
            prev={prev?.beleggPct}
            prevLabel={prevMonthLabel}
            icon={<BedDouble size={16} />}
            format={(v) => `${v}%`}
          />
          <KpiCard
            label="Snittspris / rom"
            value={current.snittPris}
            prev={prev?.snittPris}
            prevLabel={prevMonthLabel}
            icon={<TrendingUp size={16} />}
            format={(v) => `${new Intl.NumberFormat("nb-NO").format(v)} kr`}
          />
          <KpiCard
            label="Ansatte"
            value={current.ansatte}
            prev={prev?.ansatte}
            prevLabel={prevMonthLabel}
            icon={<Users size={16} />}
            format={(v) => String(v)}
          />
        </div>

        {/* ── Cost metrics ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Lønnskostnad", value: current.lonnskostnadPct, prev: prev?.lonnskostnadPct, color: "var(--color-mind)" },
            { label: "Varekostnad", value: current.varekostnadPct, prev: prev?.varekostnadPct, color: "var(--color-soul)" },
          ].map(({ label, value, prev: p, color }) => (
            <div
              key={label}
              className="p-5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-label)" }}>
                {label} % av omsetning
              </p>
              <div className="flex items-end justify-between mb-3">
                <span className="text-3xl font-bold">{value}%</span>
                {p !== undefined && <DeltaBadge curr={value} prev={p} suffix="pp" />}
              </div>
              <div className="h-2 rounded-full" style={{ background: "var(--color-border)" }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
              </div>
              {p !== undefined && (
                <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
                  Fjoråret: {p}%
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Charts ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Revenue chart */}
          <ChartCard
            title="Omsetning"
            legend={[
              { label: String(selected.year), color: "#4a7fc1", type: "bar" },
              { label: String(compareYear), color: "#d4cfc8", type: "bar" },
            ]}
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={revenueChart} barCategoryGap="35%" barGap={2}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                  axisLine={false} tickLine={false} width={42}
                  tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-bg)" }}
                  formatter={(v, name) => [formatNOKFull(Number(v)), String(name)]}
                  contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: 12, boxShadow: "var(--shadow-card)" }}
                />
                <Bar dataKey={String(selected.year)} name={String(selected.year)} fill="#4a7fc1" radius={[3, 3, 0, 0]} maxBarSize={28} />
                <Bar dataKey={String(compareYear)} name={String(compareYear)} fill="#d4cfc8" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Occupancy chart */}
          <ChartCard
            title="Beleggsprosent"
            legend={[
              { label: String(selected.year), color: "#4a7fc1", type: "line" },
              { label: String(compareYear), color: "#b0a89e", type: "line-dashed" },
            ]}
          >
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={occupancyChart}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[(min: number) => Math.max(0, Math.floor(min / 10) * 10 - 10), (max: number) => Math.ceil(max / 10) * 10 + 5]}
                  tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                  axisLine={false} tickLine={false} width={34}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  cursor={{ stroke: "var(--color-border)" }}
                  formatter={(v, name) => [`${v}%`, String(name)]}
                  contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: 12, boxShadow: "var(--shadow-card)" }}
                />
                <Line
                  type="monotone" dataKey={String(selected.year)} name={String(selected.year)}
                  stroke="#4a7fc1" strokeWidth={2.5}
                  dot={{ r: 3, fill: "#4a7fc1", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#4a7fc1", strokeWidth: 0 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone" dataKey={String(compareYear)} name={String(compareYear)}
                  stroke="#b0a89e" strokeWidth={2} strokeDasharray="5 3"
                  dot={{ r: 2.5, fill: "#b0a89e", strokeWidth: 0 }}
                  activeDot={{ r: 4, fill: "#b0a89e", strokeWidth: 0 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ── YTD summary ──────────────────────────────────────────────── */}
        <div
          className="p-5"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-label)" }}>
            Hittil i år — {selected.year}
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              {
                label: "Belegg HTI",
                value: `${current.beleggAarPct}%`,
                prev: prev ? `${prev.beleggAarPct}%` : undefined,
              },
              {
                label: "Snittspris HTI",
                value: `${new Intl.NumberFormat("nb-NO").format(current.snittPrisAar)} kr`,
                prev: prev ? `${new Intl.NumberFormat("nb-NO").format(prev.snittPrisAar)} kr` : undefined,
              },
              {
                label: "Bekreftet salg",
                value: formatNOK(current.bekreftedeSalg.reduce<number>((s, v) => s + (v ?? 0), 0)),
                prev: undefined,
              },
              {
                label: "Ubesatte stillinger",
                value: String(current.ubesatte),
                prev: prev ? String(prev.ubesatte) : undefined,
              },
            ].map(({ label, value, prev: p }) => (
              <div key={label}>
                <p className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>{label}</p>
                <p className="text-xl font-bold">{value}</p>
                {p && <p className="text-xs mt-0.5" style={{ color: "var(--color-label)" }}>Fjoråret: {p}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Staffing ─────────────────────────────────────────────────── */}
        <div
          className="p-5"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-label)" }}>
            Bemanning
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Ansatte", value: current.ansatte, prev: prev?.ansatte, good: "up" },
              { label: "Ubesatte stillinger", value: current.ubesatte, prev: prev?.ubesatte, good: "down" },
              { label: "Oppsigelser", value: current.oppsigelser, prev: prev?.oppsigelser, good: "down" },
              { label: "Nyansatte", value: current.nyansatte, prev: prev?.nyansatte, good: "up" },
            ].map(({ label, value, prev: p }) => (
              <div key={label}>
                <p className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>{label}</p>
                <p className="text-2xl font-bold">{value}</p>
                {p !== undefined && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-label)" }}>Fjoråret: {p}</p>
                )}
              </div>
            ))}
          </div>
          {current.bemanningComment && (
            <p className="text-sm mt-4 pt-4" style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-muted)" }}>
              {current.bemanningComment}
            </p>
          )}
        </div>

        {/* ── Comments ─────────────────────────────────────────────────── */}
        {(current.generalComment || current.prognosisComment || current.misc) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {current.generalComment && (
              <CommentCard title="Generell status" text={current.generalComment} />
            )}
            {current.prognosisComment && (
              <CommentCard title="Prognose / markedsforhold" text={current.prognosisComment} />
            )}
            {current.misc && (
              <CommentCard title="Eventuelt" text={current.misc} />
            )}
          </div>
        )}

        {/* ── Footer CTA ───────────────────────────────────────────────── */}
        <div className="flex justify-end pb-8">
          <Link
            href={`/input?year=${selected.year}&month=${selected.month}`}
            className="flex items-center gap-2 text-sm px-4 py-2 font-medium transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Oppdater rapport <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}

type LegendItem = { label: string; color: string; type: "bar" | "line" | "line-dashed" };

function ChartCard({ title, legend, children }: { title: string; legend: LegendItem[]; children: React.ReactNode }) {
  return (
    <div
      className="p-5"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-label)" }}>
          {title}
        </p>
        <div className="flex items-center gap-3">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              {item.type === "bar" ? (
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: item.color }} />
              ) : item.type === "line-dashed" ? (
                <svg width="18" height="10" viewBox="0 0 18 10">
                  <line x1="0" y1="5" x2="18" y2="5" stroke={item.color} strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="9" cy="5" r="2" fill={item.color} />
                </svg>
              ) : (
                <svg width="18" height="10" viewBox="0 0 18 10">
                  <line x1="0" y1="5" x2="18" y2="5" stroke={item.color} strokeWidth="2.5" />
                  <circle cx="9" cy="5" r="2.5" fill={item.color} />
                </svg>
              )}
              <span className="text-xs" style={{ color: "var(--color-muted)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

function CommentCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="p-5"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-label)" }}>
        {title}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>{text}</p>
    </div>
  );
}
