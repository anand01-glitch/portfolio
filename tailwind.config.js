export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.2)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(96, 165, 250, 0.2), transparent 36%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.16), transparent 28%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
