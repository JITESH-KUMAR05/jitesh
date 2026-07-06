export interface LeadershipEntry {
  role: string;
  org: string;
  date: string;
  bullets: string[];
}

export const leadership: LeadershipEntry[] = [
  {
    role: "Microsoft Learn Student Ambassador",
    org: "Microsoft",
    date: "Jul 2025 – Present",
    bullets: [
      "Delivered 5+ technical workshops on Microsoft Azure and GitHub Copilot, impacting 1,000+ student developers across campus programs.",
    ],
  },
  {
    role: "Vice Chair",
    org: "IEEE SSIT, Anurag University Chapter",
    date: "Jan 2024 – Dec 2025",
    bullets: [
      "Led a 20+ member team to execute 30+ technical events and hackathons, drawing 500+ participants per event over two years.",
    ],
  },
];
