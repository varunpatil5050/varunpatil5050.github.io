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
- Repeated build, interaction, responsive, and automated accessibility checks
  after the charcoal, mint, and parchment project palette refinement. Original
  solar component and styling remain unchanged.
- Atelier's pinned desktop sequence checked forward and backward, including
  manual selection persistence. Mobile and reduced-motion modes verified as
  unpinned, with working controls.
- All twelve architecture stage controls exercised with the keyboard. Chapter
  anchor alignment and active reading progress verified after correcting the
  combined scroll-padding/scroll-margin offset.
- Actual clipboard write/read checked for the contact email, with visible
  success feedback. Magnetic-link reset and reduced-motion behavior checked.
- Scroll-linked featured-surface scale changed continuously with actual scroll
  position; native cross-document title transition observed in Chrome. Normal
  direct case navigation and reduced-motion fallback also checked.
- New architecture routes checked at 320, 390, 768, and 1440 widths. Axe checks
  include all three routes on desktop/mobile and every selectable stage; a
  SyncSpace relay-label contrast edge case was fixed and retested.

Local Chrome observations showed no initial layout shift in the sampled desktop
and mobile loads. These are local checks, not production performance scores.

Not tested: Safari/Firefox, actual low-power devices, a screen-reader session,
and production Core Web Vitals. The current source uses no WebGL, external
animation library, or scroll-hijacking layer.
