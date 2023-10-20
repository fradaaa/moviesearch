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
      animation: {
        rotate: "rotate .3s ease-in-out forwards",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-red-600",
    "bg-gray-500",
    "bg-green-600",
    "text-red-600",
    "text-gray-500",
    "text-green-600",
    "border-blue-300/50",
    "border-blue-700",
  ],
};
export default config;
