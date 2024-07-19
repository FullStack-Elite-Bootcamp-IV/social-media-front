import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'liquidLava': '#7E0EEE', 
        'ligthPurple': '#AC10F5', 
        'darkVoid': '#151419', 
        'blancoHueso': '#FBFBFB', 
        'dustyGray': '#878787', 
        'slateGray': '#262626', 
      },
    },
  },
  plugins: [],
};
export default config;
