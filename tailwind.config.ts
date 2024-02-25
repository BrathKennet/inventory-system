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
        background: "#040A2F",
        background_s: "#081041",
        primary: "#3ABBEE",
        secondary: "#1B266B",
        g_initial: "#1DC3F9",
        g_final: "#4773C9",
      },
    },
  },
  plugins: [],
};
export default config;
