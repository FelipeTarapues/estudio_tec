import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        cream: "#F7F3EE",
        warm: "#E8DDD0",
        terra: { DEFAULT: "#C4714A", dark: "#A05A38", light: "#E8956A" },
        forest: { DEFAULT: "#3A5C4A", light: "#527A60" },
        ink: "#1E1A16",
        muted: "#7A6E65",
        border: "#DDD5C8",
        gold: "#C9A84C",
      },
    },
  },
  plugins: [],
};
export default config;
