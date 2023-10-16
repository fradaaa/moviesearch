import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        montserrat: ["var(--montserrat)"],
      },
      width: {
        rating: "3ch",
      },
    },
  },
  plugins: [],
  safelist: ["bg-red-600", "bg-gray-500", "bg-green-600"],
};
export default config;
