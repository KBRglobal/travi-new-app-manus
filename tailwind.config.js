/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ═══════════════════════════════════
      // TRAVI DESIGN TOKENS
      // ═══════════════════════════════════
      colors: {
        // Primary
        primary: {
          DEFAULT: '#6443F4',
          light: 'rgba(100,67,244,0.2)',
          dark: '#4A2FD4',
        },
        // Backgrounds
        bg: {
          primary: '#0A0514',
          secondary: '#1A0B32',
          card: '#1A0B32',
          overlay: 'rgba(0,0,0,0.85)',
        },
        // Text
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.6)',
          tertiary: 'rgba(255,255,255,0.4)',
          muted: 'rgba(255,255,255,0.3)',
        },
        // Status
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        // Trip statuses
        trip: {
          draft: '#9CA3AF',
          upcoming: '#3B82F6',
          pretripReady: '#F59E0B',
          active: '#22C55E',
          completed: '#8B5CF6',
          cancelled: '#EF4444',
        },
      },
      // Spacing scale
      spacing: {
        'safe': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        '18': '4.5rem',
        '88': '22rem',
      },
      // Border radius
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'input': '12px',
        'modal': '24px',
        'pill': '9999px',
      },
      // Font sizes (responsive scale)
      fontSize: {
        'heading-1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'heading-2': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '14px', fontWeight: '600' }],
      },
      // Shadows
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'fab': '0 4px 12px rgba(100, 67, 244, 0.3)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      // Animations
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
    // ═══════════════════════════════════
    // BREAKPOINTS (NativeWind v4)
    // ═══════════════════════════════════
    screens: {
      sm: '640px',   // Large phones (landscape) + small tablets
      md: '768px',   // Tablets (portrait)
      lg: '1024px',  // Tablets (landscape) + desktop
      xl: '1280px',  // Large desktop
    },
  },
  plugins: [],
};
