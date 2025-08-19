const config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#F5F7FA",
        },
        blue: {
          900: "#0E5778",
        },
        teal: {
          300: "#50E3C2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
