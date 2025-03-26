// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
  }),
  usePathname: () => "/test-path",
}))

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        name: "Test User",
        email: "test@example.com",
      },
    },
    status: "authenticated",
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(() => ({
    theme: "light",
    setTheme: jest.fn(),
    themes: ["light", "dark", "purple", "green"],
  })),
  ThemeProvider: ({ children }) => children,
}))

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

