// Pure helpers/constants shared by server components, client components, and
// the admin form — kept separate from jobs.ts, which touches the database
// (pg) and can't be imported from a client component's module graph.

export function splitLines(value: string | null): string[] {
  return value ? value.split("\n").map((line) => line.trim()).filter(Boolean) : [];
}

export function splitTags(value: string | null): string[] {
  return value ? value.split(",").map((tag) => tag.trim()).filter(Boolean) : [];
}

export const ETHIOPIA_REGIONS = [
  "Addis Ababa",
  "Oromia",
  "Amhara",
  "Tigray",
  "Somali",
  "Afar",
  "Benishangul-Gumuz",
  "Gambela",
  "Harari",
  "Sidama",
  "South Ethiopia",
  "Central Ethiopia",
  "South West Ethiopia",
  "Dire Dawa",
] as const;
