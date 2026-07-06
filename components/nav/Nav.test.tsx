import {describe, it, expect} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {ThemeProvider} from "next-themes";
import {Nav} from "./Nav";

function renderNav() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Nav />
    </ThemeProvider>
  );
}

describe("Nav", () => {
  it("renders the site name and all section links", () => {
    renderNav();
    expect(screen.getAllByText("Jitesh Kumar").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", {name: "Experience"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Projects"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Contact"})).toBeInTheDocument();
  });

  it("opens and closes the mobile menu on toggle click", () => {
    renderNav();
    const toggle = screen.getByRole("button", {name: /toggle menu/i});

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", {name: /toggle menu/i})
    ).toHaveTextContent("Close");

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", {name: /toggle menu/i})
    ).toHaveTextContent("Menu");
  });
});
