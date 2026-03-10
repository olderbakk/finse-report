"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChefHat, CalendarDays, TrendingUp, StickyNote, ChevronDown, ArrowLeft } from "lucide-react";
import {
  loadReports, saveReport, MONTHS, MONTHS_SHORT,
  type MonthReport,
} from "@/lib/data";

/* ─── helpers ───────────────────────────────────────────────────────── */

function numField(v: number | undefined): string {
  return v !== undefined && v !== 0 ? String(v) : "";
}

function toNum(s: string): number {
  return parseFloat(s.replace(",", ".")) || 0;
}

/* ─── Inner form (needs search params) ─────────────────────────────── */

function InputForm() {
  const router = useRouter();
  const params = useSearchParams();

  const defaultYear = parseInt(params.get("year") ?? "") || new Date().getFullYear();
  const defaultMonth = parseInt(params.get("month") ?? "") || new Date().getMonth() + 1;

  const [year, setYear] = useState(String(defaultYear));
  const [month, setMonth] = useState(String(defaultMonth).padStart(2, "0"));

  const [generalComment, setGeneralComment] = useState("");
  const [ansatte, setAnsatte] = useState("");
  const [ubesatte, setUbesatte] = useState("");
  const [oppsigelser, setOppsigelser] = useState("");
  const [nyansatte, setNyansatte] = useState("");
  const [bemanningComment, setBemanningComment] = useState("");
  const [omsetning, setOmsetning] = useState("");
  const [lonnskostnad, setLonnskostnad] = useState("");
  const [varekostnad, setVarekostnad] = useState("");
  const [belegg, setBelegg] = useState("");
  const [snittPris, setSnittPris] = useState("");
  const [beleggAar, setBeleggAar] = useState("");
  const [snittPrisAar, setSnittPrisAar] = useState("");
  const [salesData, setSalesData] = useState<string[]>(Array(12).fill(""));
  const [prognosisComment, setPrognosisComment] = useState("");
  const [misc, setMisc] = useState("");
  const [saved, setSaved] = useState(false);

  // Load existing data when year/month changes
  useEffect(() => {
    const reports = loadReports();
    const r = reports.find((rep) => rep.year === parseInt(year) && rep.month === parseInt(month));
    if (r) {
      setGeneralComment(r.generalComment);
      setAnsatte(numField(r.ansatte));
      setUbesatte(numField(r.ubesatte));
      setOppsigelser(numField(r.oppsigelser));
      setNyansatte(numField(r.nyansatte));
      setBemanningComment(r.bemanningComment);
      setOmsetning(numField(r.omsetning));
      setLonnskostnad(numField(r.lonnskostnadPct));
      setVarekostnad(numField(r.varekostnadPct));
      setBelegg(numField(r.beleggPct));
      setSnittPris(numField(r.snittPris));
      setBeleggAar(numField(r.beleggAarPct));
      setSnittPrisAar(numField(r.snittPrisAar));
      setSalesData(r.bekreftedeSalg.map((v) => (v !== null ? String(v) : "")));
      setPrognosisComment(r.prognosisComment);
      setMisc(r.misc);
    } else {
      // Clear form
      setGeneralComment(""); setAnsatte(""); setUbesatte(""); setOppsigelser(""); setNyansatte("");
      setBemanningComment(""); setOmsetning(""); setLonnskostnad(""); setVarekostnad("");
      setBelegg(""); setSnittPris(""); setBeleggAar(""); setSnittPrisAar("");
      setSalesData(Array(12).fill("")); setPrognosisComment(""); setMisc("");
    }
    setSaved(false);
  }, [year, month]);

  function handleSave() {
    const report: MonthReport = {
      year: parseInt(year),
      month: parseInt(month),
      generalComment,
      ansatte: toNum(ansatte),
      ubesatte: toNum(ubesatte),
      oppsigelser: toNum(oppsigelser),
      nyansatte: toNum(nyansatte),
      bemanningComment,
      omsetning: toNum(omsetning),
      lonnskostnadPct: toNum(lonnskostnad),
      varekostnadPct: toNum(varekostnad),
      beleggPct: toNum(belegg),
      snittPris: toNum(snittPris),
      beleggAarPct: toNum(beleggAar),
      snittPrisAar: toNum(snittPrisAar),
      bekreftedeSalg: salesData.map((v) => (v ? parseFloat(v) : null)),
      prognosisComment,
      misc,
    };
    saveReport(report);
    setSaved(true);
    setTimeout(() => router.push(`/?year=${year}&month=${month}`), 800);
  }

  const monthLabel = month ? MONTHS[parseInt(month) - 1] : "";

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Nav */}
      <header
        className="px-8 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <Image src="/finse-logo.png" alt="Hotel Finse 1222" height={24} width={100} className="object-contain object-left" style={{ height: 24, width: "auto" }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-label)" }}>
          Legg inn data
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        <div>
          <h1 className="text-2xl font-bold mb-1">Månedlig rapport</h1>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Fyll inn tallene for den valgte måneden.
          </p>
        </div>

        {/* Month selector */}
        <Card>
          <label className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "var(--color-label)" }}>
            Velg måned
          </label>
          <div className="flex gap-3 items-center flex-wrap">
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="appearance-none text-sm pl-3 pr-7 py-2"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  borderRadius: "var(--radius-md)",
                  minWidth: 140,
                }}
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-muted)" }} />
            </div>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-sm px-3 py-2 w-20 outline-none"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
                borderRadius: "var(--radius-md)",
              }}
            />
            {monthLabel && (
              <span className="text-sm font-semibold" style={{ color: "var(--color-muted)" }}>
                {monthLabel} {year}
              </span>
            )}
          </div>
        </Card>

        {/* Generell status */}
        <Section icon={<StickyNote size={15} />} title="Generell status">
          <Textarea value={generalComment} onChange={setGeneralComment} placeholder="Litt om drift / eventuelle utfordringer" />
        </Section>

        {/* Bemanning */}
        <Section icon={<ChefHat size={15} />} title="Bemanning">
          <div className="space-y-0">
            <Row label="Antall ansatte">
              <NumInput value={ansatte} onChange={setAnsatte} placeholder="0" />
            </Row>
            <Row label="Antall ubesatte stillinger">
              <NumInput value={ubesatte} onChange={setUbesatte} placeholder="0" />
            </Row>
            <Row label="Oppsigelser inneværende måned">
              <NumInput value={oppsigelser} onChange={setOppsigelser} placeholder="0" />
            </Row>
            <Row label="Nyansatte inneværende måned">
              <NumInput value={nyansatte} onChange={setNyansatte} placeholder="0" />
            </Row>
          </div>
          <div className="mt-4">
            <Textarea value={bemanningComment} onChange={setBemanningComment} placeholder="Eventuell, utfyllende kommentar" />
          </div>
        </Section>

        {/* Månedsrapport */}
        <Section icon={<CalendarDays size={15} />} title="Månedsrapport">
          <div className="space-y-0">
            <Row label="Totalomsetning" suffix="kr">
              <NumInput value={omsetning} onChange={setOmsetning} placeholder="0" />
            </Row>
            <Row label="Lønnskostnad % av omsetning" suffix="%">
              <NumInput value={lonnskostnad} onChange={setLonnskostnad} placeholder="0" />
            </Row>
            <Row label="Varekostnad % av omsetning" suffix="%">
              <NumInput value={varekostnad} onChange={setVarekostnad} placeholder="0" />
            </Row>
            <Row label="Beleggsprosent" suffix="%">
              <NumInput value={belegg} onChange={setBelegg} placeholder="0" />
            </Row>
            <Row label="Gjennomsnittspris" suffix="kr">
              <NumInput value={snittPris} onChange={setSnittPris} placeholder="0" />
            </Row>
          </div>
        </Section>

        {/* Hittil i år */}
        <Section icon={<TrendingUp size={15} />} title="Hittil i år og prognose">
          <div className="space-y-0 mb-5">
            <Row label="Beleggsprosent hittil i år" suffix="%">
              <NumInput value={beleggAar} onChange={setBeleggAar} placeholder="0" />
            </Row>
            <Row label="Gjennomsnittspris hittil i år" suffix="kr">
              <NumInput value={snittPrisAar} onChange={setSnittPrisAar} placeholder="0" />
            </Row>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-label)" }}>
            Bekreftet salg per måned (NOK)
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {MONTHS_SHORT.map((m, i) => (
              <div key={m} className="grid grid-cols-[2.5rem_1fr] items-center gap-2">
                <span className="text-xs" style={{ color: "var(--color-muted)" }}>{m}</span>
                <input
                  type="number"
                  value={salesData[i]}
                  onChange={(e) => {
                    const next = [...salesData];
                    next[i] = e.target.value;
                    setSalesData(next);
                  }}
                  placeholder="—"
                  className="text-xs px-2 py-1.5 text-right w-full outline-none"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Textarea value={prognosisComment} onChange={setPrognosisComment} placeholder="Markedsutgifter / spesielle forhold" />
          </div>
        </Section>

        {/* Eventuelt */}
        <Section icon={<StickyNote size={15} />} title="Eventuelt">
          <Textarea value={misc} onChange={setMisc} placeholder="Eventuelle andre forhold" />
        </Section>

        {/* Save */}
        <div className="flex items-center justify-end gap-3 pb-10">
          <Link
            href="/"
            className="text-sm px-4 py-2.5 font-medium transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Avbryt
          </Link>
          <button
            onClick={handleSave}
            className="text-sm px-6 py-2.5 font-medium transition-all"
            style={{
              background: saved ? "#4e9a52" : "var(--color-btn-primary)",
              color: "var(--color-btn-primary-fg)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {saved ? "Lagret! ✓" : "Lagre rapport"}
          </button>
        </div>
      </main>
    </div>
  );
}

/* ─── Page wrapper (Suspense for useSearchParams) ───────────────────── */

export default function InputPage() {
  return (
    <Suspense>
      <InputForm />
    </Suspense>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────── */

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

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span style={{ color: "var(--color-muted)" }}>{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-label)" }}>
          {title}
        </h2>
      </div>
      {children}
    </Card>
  );
}

function Row({ label, suffix, children }: { label: string; suffix?: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-2.5"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <span className="text-sm flex-1">{label}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        {children}
        {suffix && <span className="text-xs w-4" style={{ color: "var(--color-muted)" }}>{suffix}</span>}
      </div>
    </div>
  );
}

function NumInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="text-sm text-right px-2 py-1.5 w-28 outline-none"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text)",
        borderRadius: "var(--radius-sm)",
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
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
