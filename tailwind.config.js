/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    // ═══════════════════════════════════
    // BREAKPOINTS (NativeWind v4)
    // ═══════════════════════════════════
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      // ═══════════════════════════════════
      // TRAVI DESIGN SYSTEM
      // ═══════════════════════════════════
      colors: {
        // === Brand ===
        primary: {
          DEFAULT: '#6443F4',
          light: 'rgba(100,67,244,0.15)',
          dark: '#4A2FD4',
        },
        pink: {
          DEFAULT: '#F94498',
          light: 'rgba(249,68,152,0.15)',
          dark: '#D42E78',
        },

        // === Background ===
        bg: {
          primary: '#0A0514',
          secondary: '#120824',
          card: '#120824',
          surface: 'rgba(255,255,255,0.05)',
          overlay: 'rgba(0,0,0,0.85)',
        },

        // === Text ===
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.6)',
          muted: 'rgba(255,255,255,0.3)',
        },

        // === Border ===
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.15)',
        },

        // === Status ===
        success: {
          DEFAULT: '#4ADE80',
          light: 'rgba(74,222,128,0.15)',
        },
        warning: {
          DEFAULT: '#FBBF24',
          light: 'rgba(251,191,36,0.15)',
        },
        error: {
          DEFAULT: '#F87171',
          light: 'rgba(248,113,113,0.15)',
        },

        // === Trip Status ===
        trip: {
          upcoming: '#60A5FA',
          active: '#4ADE80',
          completed: '#A78BFA',
          cancelled: '#F87171',
        },

        // === Mascot Colors ===
        mascot: {
          yellow: '#FFD93D',
          purple: '#6443F4',
          blue: '#4FC3F7',
          green: '#4CAF50',
          orange: '#FF9800',
        },
      },

      // === Typography ===
      fontFamily: {
        heading: ['Chillax-Bold'],
        body: ['Satoshi-Regular'],
        bold: ['Satoshi-Bold'],
      },

      fontSize: {
        'display': ['36px', { lineHeight: '44px' }],
        'h1': ['28px', { lineHeight: '36px' }],
        'h2': ['24px', { lineHeight: '32px' }],
        'h3': ['20px', { lineHeight: '28px' }],
        'body-lg': ['18px', { lineHeight: '26px' }],
        'body': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px' }],
        'tiny': ['10px', { lineHeight: '14px' }],
      },

      // === Border Radius ===
      borderRadius: {
        card: '16px',
        button: '12px',
        input: '12px',
        modal: '24px',
        pill: '100px',
      },

      // === Shadows ===
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5)',
        fab: '0 4px 12px rgba(100,67,244,0.3)',
        modal: '0 8px 32px rgba(0,0,0,0.5)',
        glow: '0 0 20px rgba(100,67,244,0.3)',
        'glow-pink': '0 0 20px rgba(249,68,152,0.3)',
      },

      // === Spacing ===
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      // === Animations ===
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
