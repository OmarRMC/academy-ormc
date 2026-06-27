/** @type {import('tailwindcss').Config} */
// Tema centralizado del producto. Cambiar aquí los colores/fuentes permite
// re-alinear la identidad con el portafolio sin tocar los componentes.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta base (oscura) del portal y los decks
        bg: '#0b1622',
        bg2: '#0f1f30',
        card: '#13283d',
        ink: '#e8f1f8',
        muted: '#9db4c7',
        // Acentos
        react: '#61DAFB',
        reactDark: '#149ECA',
        accent: '#f7df1e',
        green: '#3ddc84',
        orange: '#ff8c42',
        purple: '#b794f6',
        // Curso Laravel (paleta diferenciada)
        laravel: '#ff2d20',
        laravelDark: '#b91c1c',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Cascadia Code', 'Consolas', 'Courier New', 'monospace'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,.25)',
      },
      maxWidth: {
        prose2: '70ch',
      },
    },
  },
  plugins: [],
}
