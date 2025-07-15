import { defineConfig } from "tailwindcss";
import colors from "tailwindcss/colors";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "meu-verde": "#1a1c1e",
        gray: colors.zinc,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
      },
      animation: {
        "fade-in": "fade-in 1.5s ease-out forwards",
        pulse: "pulse 3s infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
});
