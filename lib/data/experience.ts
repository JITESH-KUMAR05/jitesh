export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer Intern",
    company: "USJ Technologies (OPC) Private Limited",
    location: "Dehradun, India (Hybrid)",
    date: "May 2026 – Present",
    bullets: [
      "Built and shipped usjtechnologies.com, a full-stack B2B e-commerce platform (React 19, Supabase/PostgreSQL) with a 100+ SKU catalogue, PostgreSQL full-text search, and a multi-item quote-request workflow with automated email via serverless Deno edge functions.",
      "Designed a 16-table PostgreSQL schema secured with database-level Row-Level Security and 3-tier Role-Based Access Control (admin/manager/staff); identified and patched a privilege-escalation vulnerability with a BEFORE UPDATE trigger, enforcing authorization at the database layer.",
      "Architected the chalokumbh.com low-latency live-streaming pipeline (MediaMTX, HLS/WebRTC, ONVIF PTZ), broadcasting real-time temple ceremonies to YouTube and a custom app for the Kumbh Mela 2027.",
      "Drove end-to-end delivery and stakeholder onboarding for chalokumbh.com — turning requirements gathered directly from temple administrators into technical architecture and onboarding 3+ partner temples onto the platform.",
    ],
  },
];
