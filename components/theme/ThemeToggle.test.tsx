import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";

function renderWithTheme() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  it("toggles the html element's dark class on click", () => {
    renderWithTheme();
    const button = screen.getByRole("button", { name: /toggle theme/i });

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
