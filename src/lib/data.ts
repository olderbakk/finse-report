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
    generalComment: "Rolig januar med godt belegg, særlig i helgene. Vinterpakker solgte bra.",
    ansatte: 24, ubesatte: 1, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Ny kjøkkenassistent startet 13. januar.",
    omsetning: 2_744_000, lonnskostnadPct: 41, varekostnadPct: 31,
    beleggPct: 43, snittPris: 1_450,
    beleggAarPct: 43, snittPrisAar: 1_450,
    bekreftedeSalg: [2_744_000, null, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Februar ser lovende ut med vinterferie. Tre av fire helger nesten fullbooket.",
    misc: "",
  },
  {
    year: 2025, month: 2,
    generalComment: "Vinterferie ga sterke tall. God etterspørsel i uke 7 og 8.",
    ansatte: 25, ubesatte: 1, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Sesongassistent ansatt for vintersesong.",
    omsetning: 3_100_000, lonnskostnadPct: 40, varekostnadPct: 29,
    beleggPct: 58, snittPris: 1_600,
    beleggAarPct: 50, snittPrisAar: 1_520,
    bekreftedeSalg: [2_744_000, 3_100_000, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Påskeperioden nesten fullbooket.",
    misc: "",
  },
  {
    year: 2025, month: 3,
    generalComment: "Sterk avslutning på vintersesong. Påsken trakk mange gjester.",
    ansatte: 26, ubesatte: 0, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Fullt bemannet for påskesesongen.",
    omsetning: 3_520_000, lonnskostnadPct: 38, varekostnadPct: 27,
    beleggPct: 66, snittPris: 1_800,
    beleggAarPct: 55, snittPrisAar: 1_620,
    bekreftedeSalg: [2_744_000, 3_100_000, 3_520_000, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Vårsesongen forventes svakere. Fokus på kurs/konferanse-segmentet.",
    misc: "Planlegger å oppgradere spa-anlegg til sommeren.",
  },

  // ── 2026 ─────────────────────────────────────────────────────────
  {
    year: 2026, month: 1,
    generalComment: "Totalomsetning økte med 34,9% vs januar 2025. Rominntektene opp 113,9% som følge av salg av suiter og premium rom, samt endret helpensjonspakke-fordeling (70/30). Belegget er noe lavere, men oppveies av betydelig høyere snittspris.",
    ansatte: 27, ubesatte: 1, oppsigelser: 1, nyansatte: 2,
    bemanningComment: "En resepsjonist sluttet. To nye ansatt i restaurant og kjøkken.",
    omsetning: 3_701_000, lonnskostnadPct: 38, varekostnadPct: 19,
    beleggPct: 40, snittPris: 3_257,
    beleggAarPct: 40, snittPrisAar: 3_257,
    bekreftedeSalg: [3_701_000, null, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Bane NOR gjennomfører vedlikeholdsarbeid fredag 24.–søndag 26. april. Allerede mottatt avbestillinger og forventer dessverre flere i løpet av denne helgen.",
    misc: "",
  },
  {
    year: 2026, month: 2,
    generalComment: "Vinterferie overgikk forventningene. Sterk etterspørsel etter premium-rom fortsetter.",
    ansatte: 28, ubesatte: 0, oppsigelser: 0, nyansatte: 1,
    bemanningComment: "Alle stillinger besatt. Ekstra servitør leid inn for vinterferien.",
    omsetning: 4_200_000, lonnskostnadPct: 36, varekostnadPct: 17,
    beleggPct: 55, snittPris: 3_800,
    beleggAarPct: 47, snittPrisAar: 3_500,
    bekreftedeSalg: [3_701_000, 4_200_000, null, null, null, null, null, null, null, null, null, null],
    prognosisComment: "Mars-påsken gir godt grunnlag. Bekreftet salg ligger ca. 20% over fjoråret.",
    misc: "",
  },
  {
    year: 2026, month: 3,
    generalComment: "Påsken lå i mars i år og ga en ekstra sterk måned. Kapasiteten fullt utnyttet i påskehelgene.",
    ansatte: 28, ubesatte: 0, oppsigelser: 0, nyansatte: 0,
    bemanningComment: "Stabilt. Ingen endringer i staben.",
    omsetning: 4_800_000, lonnskostnadPct: 34, varekostnadPct: 16,
    beleggPct: 70, snittPris: 4_200,
    beleggAarPct: 55, snittPrisAar: 3_650,
    bekreftedeSalg: [3_701_000, 4_200_000, 4_800_000, null, null, null, null, null, null, null, null, null],
    prognosisComment: "April forventes svakere etter påsketoppen. Bane NOR-arbeid 24.–26. april gir allerede avbestillinger.",
    misc: "Spa-oppgraderingen er bekreftet til juni. Leverandør valgt.",
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
