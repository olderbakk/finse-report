"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChefHat, CalendarDays, TrendingUp, StickyNote, ChevronDown } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

type MetricField = { current: string; prev: string };
type MonthData = { thisYear: string; lastYear: string };

const MONTHS = ["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"];

function emptyMetric(): MetricField {
  return { current: "", prev: "" };
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function Home() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [generalComment, setGeneralComment] = useState("");

  const [ansatte, setAnsatte] = useState<MetricField>(emptyMetric());
  const [ubesatte, setUbesatte] = useState<MetricField>(emptyMetric());
  const [oppsigelser, setOppsigelser] = useState<MetricField>(emptyMetric());
  const [nyansatte, setNyansatte] = useState<MetricField>(emptyMetric());
  const [bemanningComment, setBemanningComment] = useState("");

  const [omsetning, setOmsetning] = useState<MetricField>(emptyMetric());
  const [lonnskostnad, setLonnskostnad] = useState<MetricField>(emptyMetric());
  const [varekostnad, setVarekostnad] = useState<MetricField>(emptyMetric());
  const [belegg, setBelegg] = useState<MetricField>(emptyMetric());
  const [snittPris, setSnittPris] = useState<MetricField>(emptyMetric());

  const [beleggAar, setBeleggAar] = useState<MetricField>(emptyMetric());
  const [snittPrisAar, setSnittPrisAar] = useState<MetricField>(emptyMetric());
  const [salesData, setSalesData] = useState<MonthData[]>(
    MONTHS.map(() => ({ thisYear: "", lastYear: "" }))
  );
  const [prognosisComment, setPrognosisComment] = useState("");

  const [misc, setMisc] = useState("");

  const currentYear = parseInt(year) || new Date().getFullYear();
  const lastYear = currentYear - 1;

  const chartData = salesData.map((d, i) => ({
    name: MONTHS[i],
    [currentYear]: d.thisYear ? parseFloat(d.thisYear) : undefined,
    [lastYear]: d.lastYear ? parseFloat(d.lastYear) : undefined,
  }));

  const hasChartData = chartData.some((d) => d[currentYear] || d[lastYear]);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Nav */}
      <header
        className="px-8 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span className="text-base font-semibold tracking-tight">Hotel Finse 1222</span>
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-label)" }}
        >
          Månedsrapportering
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-5">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Månedsrapportering</h1>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Hotel Finse 1222
          </p>
        </div>

        {/* Month / Year */}
        <Card>
          <div className="flex gap-3 items-center flex-wrap">
            <span className="text-sm font-medium">Måned / År</span>
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="appearance-none text-sm pl-3 pr-7 py-1.5"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: month ? "var(--color-text)" : "var(--color-muted)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <option value="">Måned</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-muted)" }}
              />
            </div>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="År"
              className="text-sm px-3 py-1.5 w-20"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
                borderRadius: "var(--radius-md)",
              }}
            />
            {month && year && (
              <span className="text-sm font-semibold" style={{ color: "var(--color-muted)" }}>
                {MONTHS[parseInt(month) - 1]} {year}
              </span>
            )}
          </div>
        </Card>

        {/* Generell status */}
        <Section icon={<StickyNote size={15} />} title="Generell status">
          <Textarea
            value={generalComment}
            onChange={setGeneralComment}
            placeholder="Litt om drift / eventuelle utfordringer"
          />
        </Section>

        {/* Bemanning */}
        <Section icon={<ChefHat size={15} />} title="Bemanning">
          <div className="space-y-0.5">
            <MetricRow label="Antall ansatte" value={ansatte} onChange={setAnsatte} />
            <MetricRow label="Antall ubesatte stillinger" value={ubesatte} onChange={setUbesatte} />
            <MetricRow label="Oppsigelser inneværende måned" value={oppsigelser} onChange={setOppsigelser} />
            <MetricRow label="Nyansatte inneværende måned" value={nyansatte} onChange={setNyansatte} />
          </div>
          <div className="mt-4">
            <Textarea
              value={bemanningComment}
              onChange={setBemanningComment}
              placeholder="Eventuell, utfyllende kommentar"
            />
          </div>
        </Section>

        {/* Månedsrapport */}
        <Section icon={<CalendarDays size={15} />} title="Månedsrapport">
          <div className="space-y-0.5">
            <MetricRow
              label="Totalomsetning"
              value={omsetning}
              onChange={setOmsetning}
              suffix="kr"
              currency
            />
            <MetricRow
              label="Lønnskostnad % av omsetning"
              value={lonnskostnad}
              onChange={setLonnskostnad}
              suffix="%"
            />
            <MetricRow
              label="Varekostnad % av omsetning"
              value={varekostnad}
              onChange={setVarekostnad}
              suffix="%"
            />
            <MetricRow
              label="Beleggsprosent"
              value={belegg}
              onChange={setBelegg}
              suffix="%"
            />
            <MetricRow
              label="Gjennomsnittspris"
              value={snittPris}
              onChange={setSnittPris}
              suffix="kr"
              currency
            />
          </div>
        </Section>

        {/* Hittil i år */}
        <Section icon={<TrendingUp size={15} />} title="Hittil i år og prognose">
          <div className="space-y-0.5 mb-6">
            <MetricRow
              label="Beleggsprosent hittil i år"
              value={beleggAar}
              onChange={setBeleggAar}
              suffix="%"
              yearLabels={[currentYear, lastYear]}
            />
            <MetricRow
              label="Gjennomsnittspris hittil i år"
              value={snittPrisAar}
              onChange={setSnittPrisAar}
              suffix="kr"
              currency
              yearLabels={[currentYear, lastYear]}
            />
          </div>

          {/* Sales input + chart */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-label)" }}
            >
              Bekreftet salg — månedlig (NOK)
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
              <div className="flex gap-2 text-xs font-medium mb-1" style={{ color: "var(--color-label)" }}>
                <span className="w-8" />
                <span className="flex-1 text-center">{currentYear}</span>
                <span className="flex-1 text-center">{lastYear}</span>
              </div>
              <div />
              {MONTHS.map((m, i) => (
                <div key={m} className="flex items-center gap-2 col-span-2 grid grid-cols-[2rem_1fr_1fr] gap-2">
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>{m}</span>
                  <input
                    type="number"
                    value={salesData[i].thisYear}
                    onChange={(e) => {
                      const next = [...salesData];
                      next[i] = { ...next[i], thisYear: e.target.value };
                      setSalesData(next);
                    }}
                    placeholder="—"
                    className="text-xs px-2 py-1 text-right w-full"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                  <input
                    type="number"
                    value={salesData[i].lastYear}
                    onChange={(e) => {
                      const next = [...salesData];
                      next[i] = { ...next[i], lastYear: e.target.value };
                      setSalesData(next);
                    }}
                    placeholder="—"
                    className="text-xs px-2 py-1 text-right w-full"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg)",
                      color: "var(--color-muted)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </div>
              ))}
            </div>

            {hasChartData && (
              <div
                className="p-4"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} barCategoryGap="35%" barGap={2}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "var(--color-muted)" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) =>
                        v >= 1_000_000
                          ? `${(v / 1_000_000).toFixed(1)}M`
                          : v >= 1000
                          ? `${(v / 1000).toFixed(0)}k`
                          : String(v)
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("nb-NO", {
                          style: "currency",
                          currency: "NOK",
                          maximumFractionDigits: 0,
                        }).format(Number(value))
                      }
                      contentStyle={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: 12,
                        boxShadow: "var(--shadow-card)",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11, color: "var(--color-muted)" }} />
                    <Bar dataKey={currentYear} fill="#4a7fc1" radius={[3, 3, 0, 0]} />
                    <Bar dataKey={lastYear} fill="#d4cfc8" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Textarea
              value={prognosisComment}
              onChange={setPrognosisComment}
              placeholder="Markedsutgifter / spesielle forhold"
            />
          </div>
        </Section>

        {/* Eventuelt */}
        <Section icon={<StickyNote size={15} />} title="Eventuelt">
          <Textarea
            value={misc}
            onChange={setMisc}
            placeholder="Eventuelle andre forhold"
          />
        </Section>

        {/* Save */}
        <div className="flex justify-end pb-12">
          <button
            className="px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "var(--color-btn-primary)",
              color: "var(--color-btn-primary-fg)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Lagre rapport
          </button>
        </div>
      </main>
    </div>
  );
}

/* ─── Shared components ─────────────────────────────────────────────── */

function Card({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span style={{ color: "var(--color-muted)" }}>{icon}</span>
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-label)" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </Card>
  );
}

function MetricRow({
  label,
  value,
  onChange,
  suffix,
  currency,
  yearLabels,
}: {
  label: string;
  value: MetricField;
  onChange: (v: MetricField) => void;
  suffix?: string;
  currency?: boolean;
  yearLabels?: [number, number];
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-2.5"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <span className="text-sm flex-1 min-w-0">{label}</span>
      <div className="flex items-center gap-3 shrink-0">
        {/* Current month */}
        <div className="flex items-center gap-1">
          {yearLabels && (
            <span className="text-xs mr-1" style={{ color: "var(--color-label)" }}>
              {yearLabels[0]}
            </span>
          )}
          <input
            type={currency ? "text" : "number"}
            value={value.current}
            onChange={(e) => onChange({ ...value, current: e.target.value })}
            placeholder="—"
            className="text-sm text-right px-2 py-1 w-24 outline-none"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "var(--radius-sm)",
            }}
          />
          {suffix && (
            <span className="text-xs w-4" style={{ color: "var(--color-muted)" }}>
              {suffix}
            </span>
          )}
        </div>

        {/* Prev year */}
        <div className="flex items-center gap-1">
          {yearLabels && (
            <span className="text-xs mr-1" style={{ color: "var(--color-label)" }}>
              {yearLabels[1]}
            </span>
          )}
          <input
            type={currency ? "text" : "number"}
            value={value.prev}
            onChange={(e) => onChange({ ...value, prev: e.target.value })}
            placeholder="(fjorår)"
            className="text-xs text-right px-2 py-1 w-24 outline-none"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              color: "var(--color-muted)",
              borderRadius: "var(--radius-sm)",
            }}
          />
          {suffix && (
            <span className="text-xs w-4" style={{ color: "var(--color-label)" }}>
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full text-sm px-3 py-2 resize-none outline-none"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        borderRadius: "var(--radius-md)",
      }}
    />
  );
}
