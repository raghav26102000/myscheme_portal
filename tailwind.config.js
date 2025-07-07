/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2D5A27', // deep forest green
        'primary-50': '#F0F9F0', // very light green
        'primary-100': '#D4F4D4', // light green
        'primary-200': '#A8E8A8', // medium light green
        'primary-300': '#7CDD7C', // medium green
        'primary-400': '#50D150', // bright green
        'primary-500': '#2D5A27', // deep forest green
        'primary-600': '#245020', // darker green
        'primary-700': '#1B3C18', // very dark green
        'primary-800': '#122810', // darkest green
        'primary-900': '#091408', // near black green
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B4513', // warm saddle brown
        'secondary-50': '#FDF8F3', // very light brown
        'secondary-100': '#F9E8D9', // light brown
        'secondary-200': '#F3D1B3', // medium light brown
        'secondary-300': '#EDBA8D', // medium brown
        'secondary-400': '#E7A367', // bright brown
        'secondary-500': '#8B4513', // warm saddle brown
        'secondary-600': '#7A3D11', // darker brown
        'secondary-700': '#5C2E0D', // very dark brown
        'secondary-800': '#3D1F08', // darkest brown
        'secondary-900': '#1F0F04', // near black brown
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#FF8C42', // vibrant orange
        'accent-50': '#FFF7F0', // very light orange
        'accent-100': '#FFE8D4', // light orange
        'accent-200': '#FFD1A8', // medium light orange
        'accent-300': '#FFBA7C', // medium orange
        'accent-400': '#FFA350', // bright orange
        'accent-500': '#FF8C42', // vibrant orange
        'accent-600': '#E67A3A', // darker orange
        'accent-700': '#CC6832', // very dark orange
        'accent-800': '#B3562A', // darkest orange
        'accent-900': '#994422', // near black orange
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FEFEFE', // near-white
        'surface': '#F8F6F3', // warm off-white
        'surface-50': '#FFFFFF', // pure white
        'surface-100': '#FDFCFA', // very light warm
        'surface-200': '#F8F6F3', // warm off-white
        'surface-300': '#F3F0ED', // light warm gray
        'surface-400': '#EEEAE7', // medium warm gray
        'surface-500': '#E9E4E1', // darker warm gray

        // Text Colors
        'text-primary': '#1A1A1A', // near-black
        'text-secondary': '#5A5A5A', // medium gray
        'text-tertiary': '#8A8A8A', // light gray
        'text-disabled': '#BDBDBD', // very light gray
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#22C55E', // bright green
        'success-50': '#F0FDF4', // very light success green
        'success-100': '#DCFCE7', // light success green
        'success-200': '#BBF7D0', // medium light success green
        'success-300': '#86EFAC', // medium success green
        'success-400': '#4ADE80', // bright success green
        'success-500': '#22C55E', // bright green
        'success-600': '#16A34A', // darker success green
        'success-700': '#15803D', // very dark success green
        'success-800': '#166534', // darkest success green
        'success-900': '#14532D', // near black success green
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber
        'warning-50': '#FFFBEB', // very light warning amber
        'warning-100': '#FEF3C7', // light warning amber
        'warning-200': '#FDE68A', // medium light warning amber
        'warning-300': '#FCD34D', // medium warning amber
        'warning-400': '#FBBF24', // bright warning amber
        'warning-500': '#F59E0B', // amber
        'warning-600': '#D97706', // darker warning amber
        'warning-700': '#B45309', // very dark warning amber
        'warning-800': '#92400E', // darkest warning amber
        'warning-900': '#78350F', // near black warning amber
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // clear red
        'error-50': '#FEF2F2', // very light error red
        'error-100': '#FEE2E2', // light error red
        'error-200': '#FECACA', // medium light error red
        'error-300': '#FCA5A5', // medium error red
        'error-400': '#F87171', // bright error red
        'error-500': '#DC2626', // clear red
        'error-600': '#DC2626', // clear red
        'error-700': '#B91C1C', // darker error red
        'error-800': '#991B1B', // very dark error red
        'error-900': '#7F1D1D', // darkest error red
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(0, 0, 0, 0.1)', // neutral gray border
        'border-light': 'rgba(0, 0, 0, 0.05)', // very light border
        'border-medium': 'rgba(0, 0, 0, 0.15)', // medium border
        'border-strong': 'rgba(0, 0, 0, 0.2)', // strong border
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'body': ['Source Sans Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'caption': ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 3.5vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 5vw, 3rem)',
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      borderRadius: {
        'sm': '0.25rem', // 4px
        'md': '0.375rem', // 6px
        'lg': '0.5rem', // 8px
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'elevation': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'slide-down': 'slide-down 200ms ease-out',
        'scale-up': 'scale-up 200ms ease-out',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'slide-down': {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-up': {
          'from': {
            transform: 'scale(1)'
          },
          'to': {
            transform: 'scale(1.02)'
          }
        },
        'pulse-subtle': {
          '0%, 100%': {
            opacity: '0.4'
          },
          '50%': {
            opacity: '0.6'
          }
        }
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
        '1300': '1300',
      },
      minHeight: {
        '44': '44px', // Touch-friendly minimum
      },
      minWidth: {
        '44': '44px', // Touch-friendly minimum
      },
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}