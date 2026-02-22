import type { CVData } from "@/lib/cv-types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "are", "you", "will",
  "have", "from", "our", "your", "their", "they", "been", "was", "were",
  "can", "not", "but", "all", "its", "any", "has", "who", "how", "what",
  "when", "each", "more", "into", "than", "also", "both", "other", "such",
  "over", "some", "well", "use", "using", "used", "work", "able", "about",
]);

function extractKeywords(text: string): string[] {
  return [...new Set(tokenize(text).filter((w) => !STOP_WORDS.has(w)))];
}

export interface ATSResult {
  score: number; // 0-100
  matched: string[];
  missing: string[];
  total: number;
}

export function calculateATSScore(cvData: CVData, jobDescription: string): ATSResult {
  const jobKeywords = extractKeywords(jobDescription);

  const cvText = [
    cvData.summary,
    cvData.title,
    cvData.skills.join(" "),
    cvData.experience.flatMap((e) => [e.role, ...e.bullets]).join(" "),
    cvData.education.map((e) => e.degree).join(" "),
    Array.isArray(cvData.certifications)
      ? cvData.certifications
          .map((c) => (typeof c === "string" ? c : c.title))
          .join(" ")
      : "",
  ]
    .join(" ")
    .toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of jobKeywords) {
    if (cvText.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  }

  const score = jobKeywords.length > 0 ? Math.round((matched.length / jobKeywords.length) * 100) : 0;

  // Return top 10 missing keywords for display
  return { score, matched, missing: missing.slice(0, 10), total: jobKeywords.length };
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Excellent", color: "text-green-600" };
  if (score >= 60) return { label: "Good", color: "text-yellow-600" };
  if (score >= 40) return { label: "Fair", color: "text-orange-500" };
  return { label: "Needs Work", color: "text-red-500" };
}
