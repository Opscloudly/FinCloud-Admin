/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-red-50", "bg-indigo-50", "text-indigo-700"],
  theme: {
    darkMode: "class",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          50: "#EFFEFC",
          60: "#C7FFF6",
          100: "#C7FFF6",
          600: "#00B3AA",
          700: "#05807B",
          800: "#0A6563",
        },
        secondary: {
          50: "#EAFFFE",
          700: "#00849E",
        },
        success: {
          50: "#ECFDF3",
          100: "#D1FADF",
          700: "#057747",
        },
        Gray: {
          50: "#F9FAFB",
          100: "#EDEEF1",
          200: "#D7DAE0",
          300: "#B3B9C6",
          400: "#8A94A6",
          500: "#667085",
          600: "#565E73",
          700: "#464C5E",
          800: "#3D424F",
          900: "#101828",
          input: "#212529",
        },
      },
      keyframes: {
        moveDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(12px)" },
        },
      },
      animation: {
        moveDown: "moveDown .15s ease-out forwards",
      },
    },
  },
  plugins: [require("daisyui")],
};
