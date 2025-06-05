/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5B2A',
        dark: '#23364F',
        primaryTransparent: '#FF5B2A33', // Opacity 0.20
        white: '#FFFFFF',
        bg: '#F7F7F7',
        black: '#141414',
        border: '#90B4E2',
        borderCard: '#90B4E263', // Opacity 0.24
        placeholderIcon: '#C2C3CB',
        tag: '#23364F05', // Opacity 0.02
        info: '#2A6DFF',
        success: '#18C43D',
        danger: '#FF2A46',
        warning: '#EBB400FF',
        gradientPrimary: ['#FF5B2A', '#23364F'],
        gradientLight: ['#FF5B2A', '#23364F'],
        gradientDark: ['#23364F', '#000000'],
        bgGradient: ['#FFFFFF', '#F6F7F7'],
      },
      backgroundImage: {
        gradientPrimary45: "linear-gradient(225deg, #FF5B2A, #FF5B2A, #23364F, #000000)",
        gradientSecondary45: "linear-gradient(225deg, #000000, #000000, #23364F, #364E6EFF)",
      },
      fontSize: {
        h1: [
          '56px',
          { lineHeight: '64px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        title_large: [
          '32px',
          { lineHeight: '40px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        title_medium: [
          '28px',
          { lineHeight: '36px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        title_small: [
          '24px',
          { lineHeight: '32px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        title_area: [
          '20px',
          { lineHeight: '28px', fontFamily: 'Poppins', fontWeight: 600 },
        ],
        input_selected: [
          '18px',
          { lineHeight: '24px', fontFamily: 'Poppins', fontWeight: 600 },
        ],
        input_placeholder: [
          '16px',
          { lineHeight: '22px', fontFamily: 'Poppins', fontWeight: 600 },
        ],
        input_checkbox: [
          '14px',
          { lineHeight: '18px', fontFamily: 'Poppins', fontWeight: 400 },
        ],
        input_checkbox_checked: [
          '14px',
          { lineHeight: '18px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        card: [
          '14px',
          { lineHeight: '16px', fontFamily: 'Poppins', fontWeight: 600 },
        ],
        content_semilarge: [
          '13px',
          { lineHeight: 'auto', fontFamily: 'Poppins', fontWeight: 500 },
        ],
        content_medium: [
          '12px',
          { lineHeight: 'auto', fontFamily: 'Poppins', fontWeight: 500 },
        ],
        content_reguler: [
          '11px',
          { lineHeight: 'auto', fontFamily: 'Poppins', fontWeight: 400 },
        ],
        label_medium_semibold: [
          '12px',
          { lineHeight: '12px', fontFamily: 'Poppins', fontWeight: 600 },
        ],
        label_small_bold: [
          '10px',
          { lineHeight: '12px', fontFamily: 'Poppins', fontWeight: 700 },
        ],
        label_small_semilight: [
          '10px',
          { lineHeight: '12px', fontFamily: 'Poppins', fontWeight: 500 },
        ],
        label_small_reguler: [
          '10px',
          { lineHeight: 'auto', fontFamily: 'Poppins', fontWeight: 400 },
        ],
        article: [
          '16px',
          { lineHeight: '36px', fontFamily: 'Poppins', fontWeight: 400 },
        ],
      },
      boxShadow: {
        popover: '0 4px 40px rgba(0, 0, 0, 1), 0 0 80px 80px rgba(0, 0, 0, 0.64)',
        notif: '0 8px 160px rgba(0, 0, 0, 1)',
        item_dropdown: '0 8px 240px rgba(0, 0, 0, 1)',
        header: '0 -20px 32px rgba(0, 0, 0, 0.32)',
        card: '0 4px 16px rgba(0, 0, 0, 0.04)', // Data sesuai gambar
        cardInfo: '0 4px 24px rgba(0, 0, 0, 0.12)', // Data sesuai gambar
        // 'custom-md': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        // 'custom-lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        // 'custom-xl': '0 20px 40px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.08)',
        // 'custom-2xl': '0 25px 50px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)',
        // 'custom-glow': '0 0 15px rgba(0, 255, 255, 0.5)', // Glow effect
        // 'custom-dark': '0 10px 20px rgba(0, 0, 0, 0.7)', // Darker shadow
      },
      
    },
  },
  plugins: [],
};
