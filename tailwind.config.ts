// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#D4AF37",
//           hover: "#E5C158",
//           container: "#d4af37",
//         },
//         secondary: {
//           DEFAULT: "#0058be",
//           container: "#2170e4",
//         },
//         background: "#f9f9ff",
//         surface: {
//           DEFAULT: "#ffffff",
//           dim: "#cfdaf2",
//           variant: "#d8e3fb",
//           container: {
//             lowest: "#ffffff",
//             low: "#f0f3ff",
//             DEFAULT: "#e7eeff",
//             high: "#dee8ff",
//             highest: "#d8e3fb",
//           }
//         },
//         slate: {
//           DEFAULT: "#1E293B",
//           grey: "#64748B",
//           light: "#E2E8F0",
//         },
//         status: {
//           success: "#4caf82",
//           error: "#ba1a1a",
//           info: "#0058be",
//         }
//       },
//       fontFamily: {
//         sora: ["Sora", "sans-serif"],
//         sans: ["DM Sans", "sans-serif"],
//         mono: ["JetBrains Mono", "monospace"],
//       },
//       borderRadius: {
//         "3xl": "24px",
//         "2xl": "18px",
//         "xl": "12px",
//         "lg": "1rem",
//         "md": "0.75rem",
//         "sm": "0.25rem",
//       },
//       boxShadow: {
//         air: "0 4px 20px rgba(0,0,0,0.03)",
//         modal: "0 12px 32px rgba(0,0,0,0.06)",
//       },
//       spacing: {
//         base: "4px",
//         xs: "8px",
//         sm: "16px",
//         md: "24px",
//         lg: "32px",
//         xl: "48px",
//         xxl: "64px",
//       }
//     },
//   },
//   plugins: [],
// };
// export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4)',
          '5': 'hsl(var(--chart-5))',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E7B0',
          dark: '#B8941E',
        },
        navy: {
          DEFAULT: '#0F2747',
          light: '#1A3A5C',
          dark: '#091B30',
        },
        success: '#22C55E',
        fintech: {
          bg: '#F8FAFC',
          text: '#0F2747',
          'text-secondary': '#64748B',
          border: '#E2E8F0',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
};
export default config;
