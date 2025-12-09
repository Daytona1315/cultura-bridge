module.exports = {
  content: [
    "./index.html",
    "./404.html"
  ],
  theme: {
    extend: {
      colors: {
        cultura: {
            DEFAULT: 'rgb(170, 19, 42)',
            hover: 'rgb(140, 15, 35)',
            light: 'rgba(170, 19, 42, 0.05)',
            bg: '#FAFAFA'
        }
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(170, 19, 42, 0.3)'
      }
    },
  },
  plugins: [],
}