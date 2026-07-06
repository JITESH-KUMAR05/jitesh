export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: "Languages", items: ["C++", "JavaScript", "TypeScript", "Python", "Java", "SQL", "Bash/Shell"] },
  { category: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "REST APIs", "WebSocket", "WebRTC"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI", "PostgreSQL", "Supabase", "Redis", "BullMQ"] },
  {
    category: "Cloud & DevOps",
    items: ["Microsoft Azure", "AWS", "Docker", "Git", "GitHub", "Linux/Unix", "Postman", "CI/CD"],
  },
  { category: "AI / ML", items: ["Azure OpenAI", "Salesforce Agentforce", "RAG", "FAISS", "LLM Integration"] },
  {
    category: "Core Concepts",
    items: ["Data Structures & Algorithms", "System Design", "Distributed Systems", "OOP", "DBMS", "Agile"],
  },
];
