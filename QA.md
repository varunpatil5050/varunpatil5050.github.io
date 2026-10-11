# Local verification — 12 October 2026

Checked the actual static production export, not only the development server.

- Production build and eight rendered/exported HTML tests pass.
- Strict frontend TypeScript check passes for the homepage, shared components,
  layout, dynamic case-study route, and not-found page.
- Chrome desktop and responsive widths 320, 390, 600, 768, 1024, and 1440:
  no document horizontal overflow.
- All six case studies directly load with the correct page title; each also
  passes the 390px overflow check. No browser runtime errors or failed asset
  requests were observed during these checks.
- Orbit pause/resume, pointer lighting, collaboration sequence buttons,
  keyboard activation, Hindi/Nepali results, evidence steps, mobile navigation,
  Escape focus return, and reduced-motion behavior were exercised.
- Axe WCAG A/AA automated checks report no violations on the homepage and the
  Atelier, Transformer LMs, and Judgment Explained case studies. This is not a
  claim of a complete manual accessibility audit.
- Desktop hero, full-page composition, individual featured projects, mobile
  hero/language preview, and desktop/mobile case-study screenshots inspected.

Not tested: Safari/Firefox, actual low-power devices, a screen-reader session,
and production Core Web Vitals. The current source uses no WebGL, external
animation library, or scroll-hijacking layer.
