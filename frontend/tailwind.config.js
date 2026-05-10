/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        background: "oklch(var(--background-raw) / <alpha-value>)",
        foreground: "oklch(var(--foreground-raw) / <alpha-value>)",
        card: "oklch(var(--card-raw) / <alpha-value>)",
        "card-foreground": "oklch(var(--card-foreground-raw) / <alpha-value>)",
        primary: "oklch(var(--primary-raw) / <alpha-value>)",
        "primary-foreground": "oklch(var(--primary-foreground-raw) / <alpha-value>)",
        muted: "oklch(var(--muted-raw) / <alpha-value>)",
        "muted-foreground": "oklch(var(--muted-foreground-raw) / <alpha-value>)",
        border: "oklch(var(--border-raw) / <alpha-value>)",
        accent: "oklch(var(--accent-raw) / <alpha-value>)",
        "accent-foreground": "oklch(var(--accent-foreground-raw) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.625rem",
        sm: "0.5rem",
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(139, 92, 246, 0.3)",
        "glow-md": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
        "glow-lg": "0 0 35px -7px rgba(139, 92, 246, 0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
