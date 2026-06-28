import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CoursePage from './pages/CoursePage.jsx'
import DeckPage from './pages/DeckPage.jsx'
import { CatalogProvider } from './data/CatalogProvider.jsx'

export default function App() {
  return (
    // El catálogo (cursos/sesiones) se carga una vez aquí y se comparte a toda la app.
    <CatalogProvider>
      <Routes>
        {/* El deck se muestra a pantalla completa, fuera del Layout del portal */}
        <Route path="/cursos/:courseId/:sessionId" element={<DeckPage />} />

        {/* Resto del portal con cabecera/pie */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cursos/:courseId" element={<CoursePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CatalogProvider>
  )
}
