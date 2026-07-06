export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  highlighted: boolean;
  order: number;
}
