import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
                  animation: {
              'float': 'float 6s ease-in-out infinite',
              'glow': 'glow 2s ease-in-out infinite alternate',
              'slide-up': 'slideUp 0.6s ease-out',
              'fade-in': 'fadeIn 0.8s ease-out',
              'scale-in': 'scaleIn 0.5s ease-out',
              'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
              'text-slide': 'textSlide 4s ease-in-out infinite',
              'bubble': 'bubble 4s ease-in-out infinite',
            },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(221, 78, 83, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(221, 78, 83, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
                  pulseSoft: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          textSlide: {
            '0%, 40%': { transform: 'translateY(0)', opacity: '1' },
            '45%': { transform: 'translateY(-0.25em)', opacity: '0.8' },
            '50%, 90%': { transform: 'translateY(-2em)', opacity: '1' },
            '95%': { transform: 'translateY(-2.25em)', opacity: '0.8' },
            '100%': { transform: 'translateY(-4em)', opacity: '1' },
          },
          bubble: {
            '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
            '50%': { transform: 'translateY(-20px) scale(1.1)', opacity: '1' },
            '100%': { transform: 'translateY(-40px) scale(0.8)', opacity: '0' },
          },
      },
      colors: {
        brand: {
          50: '#e9edf3',
          100: '#cfd9e6',
          200: '#a5b5cb',
          300: '#7b90b0',
          400: '#567298',
          500: '#3a5a80',
          600: '#2b4766',
          700: '#223a54',
          800: '#1b3046',
          900: '#162b4a'
        },
        accent: {
          50: '#ffe9ea',
          100: '#ffcdcf',
          200: '#ff9ea2',
          300: '#ff7076',
          400: '#f9565c',
          500: '#dd4e53',
          600: '#c24448',
          700: '#a53a3d',
          800: '#8a3134',
          900: '#732a2c'
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neumorphic': '20px 20px 60px #d1d5db, -20px -20px 60px #ffffff',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      }
    }
  },
  plugins: []
};

export default config;


