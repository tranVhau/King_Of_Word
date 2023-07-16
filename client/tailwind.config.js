/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-golden-color": "#FFCB2E",
        "my-softer-golden": "#FFE55C",
      },
      fontFamily: {
        Londrina_Solid: ["Londrina Solid", "cursive"],
      },
      backgroundImage: {
        "my-find-match-bg": "url('/assets/images/bg-find-match.png')",
        "my-lobby-bg": "url('/assets/images/my-bg-lobby.png')",
        "my-game-bg": "url('/assets/images/my-bg-game.png')",
      },
    },
  },

  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
