import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` queda configurable para poder servir el sitio en la raíz de un
// subdominio (por defecto '/') o bajo un sub-path (p. ej. '/cursos/') si en el
// futuro se decide incrustarlo dentro del portafolio principal.
// Se puede sobreescribir con la variable de entorno VITE_BASE.
export default defineConfig(() => ({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
}))
