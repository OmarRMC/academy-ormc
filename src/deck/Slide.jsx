// Contenedor de diapositiva de formato libre.
// El propio Deck envuelve cada nodo en `.deck-slide`; aquí solo agrupamos el
// contenido. La prop `center` la lee Deck para centrar la diapositiva.
export default function Slide({ children }) {
  return <>{children}</>
}
