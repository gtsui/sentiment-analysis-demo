import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["var(--font-header)"],
        body: ["var(--font-body)"],
        alt: ["var(--font-alt)"],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "120%", fontWeight: "500" }],
        h2: ["48px", { lineHeight: "120%", fontWeight: "500" }],
        h3: ["36px", { lineHeight: "120%", fontWeight: "500" }],
        h4: ["24px", { lineHeight: "120%", fontWeight: "500" }],
        h5: ["18px", { lineHeight: "120%", fontWeight: "500" }],
        h6: ["18px", { lineHeight: "120%", fontWeight: "500" }],
        sh1: ["24px", { lineHeight: "120%", fontWeight: "400" }],
        sh2: ["20px", { lineHeight: "120%", fontWeight: "400" }],
        sh3: ["18px", { lineHeight: "120%", fontWeight: "400" }],
        sh4: ["16px", { lineHeight: "120%", fontWeight: "400" }],
        sh5: ["14px", { lineHeight: "120%", fontWeight: "400" }],
        sh6: ["12px", { lineHeight: "120%", fontWeight: "400" }],
        p1: ["16px", { lineHeight: "120%", fontWeight: "300" }],
        p2: ["14px", { lineHeight: "120%", fontWeight: "300" }],
        p3: ["12px", { lineHeight: "120%", fontWeight: "300 " }],
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        contrast: {
          high: "#F3F3F3",
          medium: "#C3C3C3",
          low: "#69696A",
        },
        neutral: {
          50: "#F3F3F3",
          100: "#F0F0F0",
          200: "#DADADA",
          300: "#C3C3C3",
          400: "#969697",
          500: "#69696A",
          600: "#353535",
          700: "#292929",
          800: "#1E1E1E",
          900: "#121212 ",
        },
        primary: {
          400: "#b0dC72",
          500: "#9dd44f",
          600: "#8ACC28",
        },
      },
    },
  },
  plugins: [],
};
export default config;
