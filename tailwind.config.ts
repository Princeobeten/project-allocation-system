import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#152345',
        cta: '#2563eb',
        'cta-hover': '#1d4ed8',
        background: '#111827',
      },
    },
  },
  plugins: [],
};
export default config;
