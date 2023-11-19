/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "estado-atendida": "#34D399",
        "estado-pendiente": "#FBBF24",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      verdeazulado: "#E2E8F0",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      bermuda: "#78dcca",

      "primary-dark-blue": "#002DA8",
      "primary-dusk-blue": "#264F6E",
      "primary-navy-blue": "#346D98",
      "primary-periwinkle": "#3D67D9",
      "primary-light-periwinkle": "#6E8BD9",

      // Secondary Color A
      "secondary-gold": "#F9CD00",
      "secondary-mustard": "#A49138",
      "secondary-bronze": "#816B00",
      "secondary-sunflower": "#FCDC47",
      "secondary-pale-gold": "#FCE680",

      // Secondary Color B
      "secondary-orange": "#F97C00",
      "secondary-burnt-orange": "#A46D38",
      "secondary-dark-orange": "#814000",
      "secondary-light-orange": "#FCA147",
      "secondary-pale-orange": "#FCBE80",

      // Grays
      "gray-one": "#C3D0D4",

      //Chips
      "chip-green": "#C6F6D5",
      "chip-yellow": "#fefcbf",
      "chip-red": "#f9acaa",
      "chip-blue": "#a0c4ff",
      "chip-orange": "#fbd38d",
    },
  },
  plugins: [require("flowbite/plugin")],
}
