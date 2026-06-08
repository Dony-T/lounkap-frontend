import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4AF37",
          hover: "#E5C158",
          container: "#d4af37",
        },
        secondary: {
          DEFAULT: "#0058be",
          container: "#2170e4",
        },
        background: "#f9f9ff",
        surface: {
          DEFAULT: "#ffffff",
          dim: "#cfdaf2",
          variant: "#d8e3fb",
          container: {
            lowest: "#ffffff",
            low: "#f0f3ff",
            DEFAULT: "#e7eeff",
            high: "#dee8ff",
            highest: "#d8e3fb",
          }
        },
        slate: {
          DEFAULT: "#1E293B",
          grey: "#64748B",
          light: "#E2E8F0",
        },
        status: {
          success: "#4caf82",
          error: "#ba1a1a",
          info: "#0058be",
        }
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "3xl": "24px",
        "2xl": "18px",
        "xl": "12px",
        "lg": "1rem",
        "md": "0.75rem",
        "sm": "0.25rem",
      },
      boxShadow: {
        air: "0 4px 20px rgba(0,0,0,0.03)",
        modal: "0 12px 32px rgba(0,0,0,0.06)",
      },
      spacing: {
        base: "4px",
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
        xxl: "64px",
      }
    },
  },
  plugins: [],
};
export default config;
