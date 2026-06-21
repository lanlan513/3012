/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        paper: {
          50: "#fffaf0",
          100: "#fef6e6",
          200: "#f9ecd0",
          300: "#f0dfb0",
          400: "#e6cf94",
          500: "#d4b876",
          600: "#b89752",
          700: "#8b6914",
          800: "#5c440c",
          900: "#3a2a06",
        },
        ink: {
          50: "#f7f5f0",
          100: "#ebe7dd",
          200: "#d4cbb8",
          300: "#b5a58a",
          400: "#967f5f",
          500: "#6b5639",
          600: "#4a3823",
          700: "#332515",
          800: "#1f1609",
          900: "#0f0a03",
        },
        gold: {
          50: "#fffdf5",
          100: "#fff8e1",
          200: "#ffedb3",
          300: "#ffd87a",
          400: "#ffc04d",
          500: "#d4a017",
          600: "#b8860b",
          700: "#8b6914",
          800: "#5c440c",
          900: "#3a2a06",
        },
        leather: {
          50: "#f8f4ed",
          100: "#ede4d6",
          200: "#d8c7a8",
          300: "#bfa176",
          400: "#a67d4d",
          500: "#7d5a2e",
          600: "#5f4521",
          700: "#473218",
          800: "#2e2010",
          900: "#171008",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        decorative: ['"Cinzel"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px rgba(60, 42, 6, 0.15)',
        'paper-lg': '0 10px 40px rgba(60, 42, 6, 0.2)',
        'gold': '0 0 20px rgba(212, 160, 23, 0.3)',
        'inner-paper': 'inset 0 2px 10px rgba(60, 42, 6, 0.1)',
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')",
        'gradient-gold': 'linear-gradient(135deg, #ffd87a 0%, #d4a017 50%, #b8860b 100%)',
      },
      animation: {
        'page-turn': 'pageTurn 2s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
