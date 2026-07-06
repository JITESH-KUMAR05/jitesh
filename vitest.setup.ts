import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock matchMedia for next-themes
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    // matches is hardcoded to false; tests verifying OS dark-preference detection must override window.matchMedia locally
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
