import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
      '9/10': '90%',
    },
    width: {
      '98%': '98%',
    },
  },
  },
  plugins: [],
} satisfies Config;
