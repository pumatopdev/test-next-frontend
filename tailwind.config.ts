import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "base-color" : "#1A1A1A",
        "header-color" : "#0D0D0D",
        "sky-header" : "#4EA8DE",
        "sky-btn" : "#1E6F9F",
        "purple-header" : "#5E60CE",
        "purple-text" : "#8284FA",
        "gray-text": "#F2F2F2",
        "gray2-text" : "#808080",
        "gray-round": "#333333",
        "task-color" : "#262626",
        "checkbox" : "#4EA8DE",
        "c-red" : "#FF3B30",
        "c-orange" : "#FF9500",
        "c-yellow" : "#FFCC00",
        "c-green" : "#34C759",
        "c-blue" : "#007AFF",
        "c-indigo" : "#5856D6",
        "c-purple" : "#AF52DE",
        "c-pink" : "#FF2D55",
        "c-brown" : "#A2845E",
      },
    },
  },
  plugins: [],
} satisfies Config;
