# Local verification — 12 October 2026

Checked the actual static production export, not only the development server.

## Five-project / hand-scan refinement

- Production build and seven rendered/exported HTML tests pass. The homepage
  contains five full showcases; every case is directly exported. SyncSpace is
  absent from the homepage, case rotation, route list, and sitemap. Its old
  local static route returns 404.
- Strict frontend TypeScript check passes for the homepage, shared components,
  layout, dynamic case-study route, and not-found page.
- Each project's scene remains visible after pointer hover and a component
  interaction. Reveal state persists separately from React-managed classes.
- The hand illustration contains exactly 21 unique indices (0–20) and the
  anatomical landmark connections. All five finger controls select the correct
  four-node chain using the keyboard.
- Hand-scan pause/resume, offscreen suspension, and reduced-motion static view
  work. The illustration does not claim camera input or model output.
- Cursor-light pseudo-elements are absent on the project surfaces, solar
  panel, and footer. The solar's fixed halo remains; other decorative orbit
  elements are absent. Header, About, and favicon use VP.
- Homepage at 320, 390, 768, and 1440px has no horizontal overflow. All five
  cases also pass 320, 390, and 768px overflow checks.
- All eight architecture-stage controls across StreamRank and SignSense were
  exercised with the keyboard; five-case next-project rotation is correct.
- Axe WCAG A/AA automated checks report no violations on the homepage and all
  five case studies in the sampled reduced-motion state. This is not a claim
  of a complete manual accessibility audit.
- Desktop hero, both new full showcases, SignSense case visual, mobile project
  compositions, and mobile VP monogram screenshots were visually inspected.
- No browser runtime errors were observed in this pass. No new dependencies.

Earlier passes checked Atelier's reversible desktop sticky story and manual
mobile alternative, contact clipboard feedback, magnetic buttons, chapter
reading navigation, language/evidence controls, native project transitions,
and mobile navigation. Those checks are historical, not newly rerun in full.

Not tested: Safari/Firefox, actual low-power devices, a screen-reader session,
and production Core Web Vitals. The current source uses no WebGL, external
animation library, or scroll-hijacking layer. Changes remain local pending approval.
