import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Recharts uses ResizeObserver via ResponsiveContainer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

// DnD Kit uses PointerEvent
if (typeof PointerEvent === 'undefined') {
  global.PointerEvent = MouseEvent as unknown as typeof PointerEvent;
}

// Some components call window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
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

// Mock scrollTo (jsdom limitation)
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
