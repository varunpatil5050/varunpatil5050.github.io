"use client";
import type { Project } from "../data/projects";
import {
  Header,
  Footer,
  Arrow,
  ExternalLink,
  usePortfolioMotion,
  pointerLight,
  resetLight,
} from "./Site";
import {
  AtelierPreview,
  LanguagePreview,
  EvidencePreview,
  Miniature,
} from "./ProjectVisuals";

export default function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: { title: string; slug: string };
}) {
  usePortfolioMotion();
  const kind = project.slug;
  return (
    <>
      <Header detail />
      <main className="case-main section-shell" id="main-content">
        <a className="case-back" href="/#work">
          <Arrow /> Back to selected work
        </a>
        <section className="case-hero" aria-labelledby="case-title">
          <p className="eyebrow">
            Case study {project.number} / {project.category}
          </p>
          <h1 id="case-title">
            {project.title}
            <span className="title-dot">.</span>
          </h1>
          <div className="case-hero-summary">
            <p>{project.summary}</p>
            <dl className="case-meta">
              <div>
                <dt>Contribution</dt>
                <dd>
                  {project.role}
                  <br />
                  Software & systems engineering
                </dd>
              </div>
              <div>
                <dt>Explore</dt>
                <dd>
                  {project.github ? (
                    <ExternalLink href={project.github}>
                      View repository <Arrow />
                    </ExternalLink>
                  ) : (
                    <a href="mailto:varunp685@gmail.com?subject=Judgment%20Explained">
                      Discuss the research <Arrow />
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <div
          className={`case-visual ${kind === "atelier" ? "dark-stage" : ""} ${kind === "judgment-explained" ? "evidence-case" : ""}`}
          data-reveal="scene"
          onPointerMove={pointerLight}
          onPointerLeave={resetLight}
        >
          {kind === "atelier" ? (
            <AtelierPreview />
          ) : kind === "transformer-lms" ? (
            <LanguagePreview />
          ) : kind === "judgment-explained" ? (
            <EvidencePreview />
          ) : (
            <>
              <div className="large-miniature">
                <Miniature kind={kind} />
              </div>
              <p
                className="visual-disclaimer"
                style={{ color: "var(--muted)" }}
              >
                Conceptual system illustration — not a live model output or
                product screenshot.
              </p>
            </>
          )}
        </div>
        <div
          className="case-metrics"
          style={{
            gridTemplateColumns: `repeat(${project.metrics.length}, minmax(0, 1fr))`,
          }}
        >
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
              {metric.note && <small>{metric.note}</small>}
            </div>
          ))}
        </div>
        <div className="case-body">
          <aside className="case-contents" aria-label="Case study contents">
            <p className="eyebrow">In this study</p>
            {project.sections.map((section, i) => (
              <a key={section.title} href={`#chapter-${i + 1}`}>
                0{i + 1} / {section.title}
              </a>
            ))}
          </aside>
          <div className="case-chapters">
            {project.sections.map((section, i) => (
              <section
                className="case-chapter"
                key={section.title}
                id={`chapter-${i + 1}`}
                data-reveal
              >
                <span>0{i + 1}</span>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ol
                    className="architecture-list"
                    aria-label="Architecture flow"
                  >
                    {section.points.map((point, j) => (
                      <li key={point}>
                        <span>0{j + 1}</span>
                        {point}
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </div>
        </div>
        <div className="case-tech" data-reveal>
          <p className="eyebrow">Built with</p>
          <p>{project.technologies.join(" / ")}</p>
        </div>
        <a href={`/work/${next.slug}/`} className="case-next">
          <div>
            <p className="eyebrow">Next exploration</p>
            <h2>{next.title}</h2>
          </div>
          <Arrow />
        </a>
      </main>
      <Footer detail />
    </>
  );
}
