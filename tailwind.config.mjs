/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        btnActive: "#202020",
        bgMain: "#060606",
        bgPrimary: "#111111",
        bgSecondary: "#202020",
        fgPrimary: "#E0E0E0",
        fgSecondary: "#898989",
        fgTertiary: "#323232",
        accent: "#1ED760",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: "lofi",
  },
};
