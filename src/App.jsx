import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CoursePage from './pages/CoursePage.jsx'
import DeckPage from './pages/DeckPage.jsx'

export default function App() {
  return (
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
  )
}
