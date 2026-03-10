export type MonthReport = {
  year: number;
  month: number; // 1–12
  generalComment: string;
  // Bemanning
  ansatte: number;
  ubesatte: number;
  oppsigelser: number;
  nyansatte: number;
  bemanningComment: string;
  // Månedsrapport
  omsetning: number; // NOK
  lonnskostnadPct: number;
  varekostnadPct: number;
  beleggPct: number;
  snittPris: number;
  // Hittil i år
  beleggAarPct: number;
  snittPrisAar: number;
  bekreftedeSalg: (number | null)[]; // index 0 = jan
  prognosisComment: string;
  misc: string;
};

export const MONTHS = [
  "Januar","Februar","Mars","April","Mai","Juni",
  "Juli","August","September","Oktober","November","Desember",
];

export const MONTHS_SHORT = [
  "Jan","Feb","Mar","Apr","Mai","Jun",
  "Jul","Aug","Sep","Okt","Nov","Des",
];

/* ── Dummy data ─────────────────────────────────────────────────────── */

export const DUMMY_REPORTS: MonthReport[] = [
  // ── 2025 ─────────────────────────────────────────────────────────
  {
    year: 2025, month: 1,
    generalComment: "Rolig oppstart, godt besøk i helgene. Vinterpakken fungerer bra.",
    ansatte: 24, ubesatte: 1, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Ny kjøkkenassistent startet 13. januar.",
    omsetning: 2_820_000, lonnskostnadPct: 34, varekostnadPct: 27,
    beleggPct: 72, snittPris: 1850,
    beleggAarPct: 72, snittPrisAar: 1850,
    bekreftedeSalg: [2_820_000, null, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Februar ser lovende ut med fullt hus i tre av fire helger.",
    misc: "",
  },
  {
    year: 2025, month: 2,
    generalComment: "Vinterferie ga sterke tall. Etterspørselen oversteg kapasiteten i uke 8.",
    ansatte: 25, ubesatte: 1, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Sesongassistent ansatt for vintersesongen.",
    omsetning: 3_140_000, lonnskostnadPct: 33, varekostnadPct: 26,
    beleggPct: 79, snittPris: 1930,
    beleggAarPct: 75, snittPrisAar: 1890,
    bekreftedeSalg: [2_820_000, 3_140_000, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Påskeperioden er nesten fullbooket.",
    misc: "",
  },
  {
    year: 2025, month: 3,
    generalComment: "Sterk avslutning på vintersesong. Påsken trakk mange gjester.",
    ansatte: 26, ubesatte: 0, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Fullt bemannet for påskesesongen.",
    omsetning: 3_520_000, lonnskostnadPct: 32, varekostnadPct: 25,
    beleggPct: 83, snittPris: 2110,
    beleggAarPct: 78, snittPrisAar: 1960,
    bekreftedeSalg: [2_820_000, 3_140_000, 3_520_000, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Vårsesongen forventes å bli tyngre. Fokus på kurs/konferanse-segmentet.",
    misc: "Planlegger å oppgradere spa-anlegg til sommeren.",
  },

  // ── 2026 ─────────────────────────────────────────────────────────
  {
    year: 2026, month: 1,
    generalComment: "Sterk januar. Snøforholdene var eksepsjonelt gode og trakk ekstra skigjester.",
    ansatte: 27, ubesatte: 1, oppsigelser: 1, nyansatte: 2,
    bemanningComment: "En resepsjonist sluttet. To nye ansatt i restaurant og kjøkken.",
    omsetning: 3_210_000, lonnskostnadPct: 33, varekostnadPct: 25,
    beleggPct: 78, snittPris: 2050,
    beleggAarPct: 78, snittPrisAar: 2050,
    bekreftedeSalg: [3_210_000, null, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Februar ser enda bedre ut enn fjorår. Vinterpakken er utsolgt i uke 7 og 8.",
    misc: "",
  },
  {
    year: 2026, month: 2,
    generalComment: "Vinterferie overgikk forventningene. Rekordmåned for omsetning.",
    ansatte: 28, ubesatte: 0, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Alle stillinger besatt. Ekstra servitør leid inn for vinterferien.",
    omsetning: 3_680_000, lonnskostnadPct: 32, varekostnadPct: 24,
    beleggPct: 86, snittPris: 2220,
    beleggAarPct: 82, snittPrisAar: 2135,
    bekreftedeSalg: [3_210_000, 3_680_000, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Mars-påsken gir godt grunnlag. Bekreftet salg ligger 14% over fjoråret.",
    misc: "",
  },
  {
    year: 2026, month: 3,
    generalComment: "Påsken lå i mars i år, noe som ga en ekstra sterk måned. Kapasiteten fullt utnyttet.",
    ansatte: 28, ubesatte: 0, oppsigelser: 0, nyansatte: 0,
    bemanningComment: "Stabilt. Ingen endringer i staben.",
    omsetning: 4_050_000, lonnskostnadPct: 31, varekostnadPct: 23,
    beleggPct: 91, snittPris: 2390,
    beleggAarPct: 85, snittPrisAar: 2220,
    bekreftedeSalg: [3_210_000, 3_680_000, 4_050_000, null, null, null, null, null, null, null, null, null],
    prognosisComment: "April forventes å bli svakere etter påsketoppen. Fokus på kurs/møtemarked.",
    misc: "Spa-oppgraderingen er nå bekreftet til juni. Leverandør valgt.",
  },
];

/* ── Storage helpers ────────────────────────────────────────────────── */

const STORAGE_KEY = "finse_reports";

export function loadReports(): MonthReport[] {
  if (typeof window === "undefined") return DUMMY_REPORTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DUMMY_REPORTS;
    const saved: MonthReport[] = JSON.parse(raw);
    // Merge: saved takes priority over dummy for matching year/month
    const merged = [...DUMMY_REPORTS];
    for (const s of saved) {
      const idx = merged.findIndex((r) => r.year === s.year && r.month === s.month);
      if (idx >= 0) merged[idx] = s;
      else merged.push(s);
    }
    return merged.sort((a, b) => a.year * 100 + a.month - (b.year * 100 + b.month));
  } catch {
    return DUMMY_REPORTS;
  }
}

export function saveReport(report: MonthReport): void {
  if (typeof window === "undefined") return;
  const existing = loadReports();
  const idx = existing.findIndex((r) => r.year === report.year && r.month === report.month);
  if (idx >= 0) existing[idx] = report;
  else existing.push(report);
  // Only save non-dummy entries (overrides)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getReport(year: number, month: number): MonthReport | undefined {
  return loadReports().find((r) => r.year === year && r.month === month);
}

export function formatNOK(value: number): string {
  if (value >= 1_000_000)
    return `${(value / 1_000_000).toFixed(2).replace(".", ",")} MNOK`;
  if (value >= 1_000)
    return `${(value / 1_000).toFixed(0)} kNOK`;
  return new Intl.NumberFormat("nb-NO").format(value) + " kr";
}

export function formatNOKFull(value: number): string {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(value);
}
