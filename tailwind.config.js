/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"], // Adjust paths as needed
  theme: {
    extend: {
      colors: {
        customGreen: "#3CAB7D",
        darkGray: "#61605F",
        darkGreen: "#417544",
      },
    },
  },
  plugins: [],
};
