import { business } from '@/content/business';

/**
 * Inline SVG service-area diagram, not a geographic map: no unverifiable town
 * coordinates are invented. Replace with a client-supplied map image when available.
 */
export function ServiceAreaDiagram() {
  const ring = business.towns.filter((town) => town !== 'Girard');
  const points = ring.map((town, i) => {
    const angle = (-90 + i * (360 / ring.length)) * (Math.PI / 180);
    return {
      town,
      x: 400 + 300 * Math.cos(angle),
      y: 230 + 175 * Math.sin(angle),
      anchor: (Math.cos(angle) > 0.3 ? 'start' : Math.cos(angle) < -0.3 ? 'end' : 'middle') as 'start' | 'end' | 'middle',
    };
  });
  return (
    <figure className="mt-6">
      <svg viewBox="0 0 800 460" role="img" aria-labelledby="area-svg-title area-svg-desc" className="w-full rounded-xl border border-line bg-brand-soft">
        <title id="area-svg-title">Wm. Price Heating &amp; Cooling 15-town service area diagram</title>
        <desc id="area-svg-desc">A schematic diagram with Girard, Ohio at the centre and the other 14 served towns arranged around it. Not drawn to scale.</desc>
        <circle cx="400" cy="230" r="185" fill="none" stroke="#bcd3ec" strokeWidth="2" strokeDasharray="6 6" />
        {points.map((p) => (
          <g key={p.town}>
            <line x1="400" y1="230" x2={p.x} y2={p.y} stroke="#c6d9ee" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="4" fill="#004b93" />
            <text x={p.x + (p.anchor === 'start' ? 9 : p.anchor === 'end' ? -9 : 0)} y={p.y + 4} textAnchor={p.anchor} fontSize="14" fill="#00305e">{p.town}</text>
          </g>
        ))}
        <circle cx="400" cy="230" r="56" fill="#004b93" />
        <text x="400" y="226" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Girard</text>
        <text x="400" y="245" textAnchor="middle" fontSize="12" fill="#d9e9fa">Our home base</text>
      </svg>
      <figcaption className="mt-2 text-sm text-muted">Schematic diagram of our 15-town service area — not a geographic map.</figcaption>
    </figure>
  );
}
