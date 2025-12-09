import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#18181B",
        foreground: "#FFFFFF",
        "accent-orange": "#ff6b35",
        "input-bg": "rgba(24,24,27,0.4)",
        "placeholder": "#757579",
        "primary-button": "rgba(255,107,53,0.52)",
        "secondary-button": "rgba(255,255,255,0.16)",
        "apple-button": "rgba(0,0,0,0.25)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        "input-glow": "2px 2px 4px 0px #ff6b35",
        "text": "0px 4px 4px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};
export default config;
