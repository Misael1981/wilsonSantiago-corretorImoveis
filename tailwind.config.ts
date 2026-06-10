import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "muted-custom": "hsl(var(--muted-custom))",
        "muted-custom-hover": "hsl(var(--muted-custom-hover))",
      },
    },
  },
  plugins: [],
}

export default config
