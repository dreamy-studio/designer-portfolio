// Fondo del hero: retícula editorial monocroma.
// Capa de líneas finas atenuada con máscara radial.
// Sin JS, theme-aware vía vars CSS, estática (sin animación).
export default function HeroGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-grid-lines" />
    </div>
  );
}
