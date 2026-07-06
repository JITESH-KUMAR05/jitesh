import {describe, it, expect} from "vitest";
import {getProjects} from "./getProjects";

describe("getProjects", () => {
  it("loads all seeded project files with a valid shape", () => {
    const projects = getProjects();
    expect(projects.length).toBe(6);
    for (const p of projects) {
      expect(typeof p.title).toBe("string");
      expect(typeof p.description).toBe("string");
      expect(Array.isArray(p.tags)).toBe(true);
      expect(typeof p.highlighted).toBe("boolean");
    }
  });

  it("marks exactly the three resume-headline projects as highlighted", () => {
    const projects = getProjects();
    const highlightedTitles = projects
      .filter(p => p.highlighted)
      .map(p => p.title)
      .sort();
    expect(highlightedTitles).toEqual(["AmeBot", "ReachInbox", "VoiceFlow"]);
  });
});
