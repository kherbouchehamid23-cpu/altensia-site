import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        altensia: {
          deep: "#031B33",
          deep2: "#07223D",
          cyan: "#19E3FF"
        }
      }
    }
  },
  plugins: []
};
export default config;
