import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: "#f4f6fb",
        sidebar: "#131f3a",
        sidebarHover: "#1d2c4f",
        panel: "#1b2230",
        panelDark: "#141a26",
        ink: "#1e293b",
        muted: "#64748b",
        cyan: { glow: "#22d3ee" },
        violet: { glow: "#7c5cff" },
      },
      boxShadow: {
        card: "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
        cardHover: "0 8px 24px rgba(16,24,40,0.12)",
        glow: "0 0 24px rgba(34,211,238,0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
