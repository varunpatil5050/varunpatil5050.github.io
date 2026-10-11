"use client";

import { useEffect, useState } from "react";

const links = {
  github: "https://github.com/varunpatil5050",
  linkedin: "https://www.linkedin.com/in/varun-patil-54060b177/",
  email: "mailto:varunp685@gmail.com",
  atelier: "https://github.com/varunpatil5050/Atelier",
  transformers:
    "https://github.com/varunpatil5050/hindi-nepali-transformers-from-scratch",
  streamRank: "https://github.com/varunpatil5050/StreamRank",
  signSense: "https://github.com/varunpatil5050/SignSense",
  syncSpace: "https://github.com/varunpatil5050/SyncSpace",
};

const languages = {
  Hindi: { script: "हिन्दी", before: 30.33, after: 70.67 },
  Nepali: { script: "नेपाली", before: 31.11, after: 63.61 },
};

const replayFrames = [
  {
    label: "A room takes shape",
    code: "const room = await connect();",
    note: "A shared document is created.",
    peers: ["V"],
  },
  {
    label: "An agent proposes an edit",
    code: "const room = await connect();\nawait agent.propose(room);",
    note: "An agent joins as a CRDT participant.",
    peers: ["V", "A"],
  },
  {
    label: "The approved edit is recorded",
    code: "const room = await connect();\nawait agent.propose(room);\nawait room.commit(approvedEdit);",
    note: "The event log preserves edits and presence.",
    peers: ["V", "A", "R"],
  },
];

const archive = [
  {
    name: "StreamRank",
    category: "Recommendation",
    index: "04",
    description:
      "A four-stage recommendation funnel, from retrieval and ranking to diversity and serving. Trained on 12.5M interactions.",
    stack: "PyTorch · Kafka · Redis · FAISS",
    href: links.streamRank,
  },
  {
    name: "SignSense",
    category: "Computer vision",
    index: "05",
    description:
      "Real-time ASL recognition from 126-D landmark sequences, with 0.92 ROC-AUC and streaming inference below 15 ms per frame.",
    stack: "PyTorch · MediaPipe · FastAPI · ONNX",
    href: links.signSense,
  },
  {
    name: "SyncSpace",
    category: "Collaboration",
    index: "06",
    description:
      "A local-first collaborative code editor with shared cursors, CRDT synchronization, and a stateless WebSocket relay.",
    stack: "CodeMirror 6 · Yjs · FastAPI",
    href: links.syncSpace,
  },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<keyof typeof languages>("Hindi");
  const [replay, setReplay] = useState(2);
  const [filter, setFilter] = useState("All work");
  const result = languages[language];
  const frame = replayFrames[replay];
  const projects =
    filter === "All work"
      ? archive
      : archive.filter((project) => project.category === filter);

  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const updateProgress = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--scroll-progress",
          `${max > 0 ? (window.scrollY / max) * 100 : 0}%`,
        );
        ticking = false;
      });
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    document.body.classList.add("site-ready");
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.body.classList.remove("site-ready");
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-line" aria-hidden="true">
        <i />
      </div>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          onClick={() => setMenuOpen(false)}
          aria-label="Varun Patil, back to top"
        >
          <span className="brand-mark">vp.</span>
          <span>Varun Patil</span>
        </a>
        <nav
          id="main-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Selected work
          </a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>
            Experience
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="header-actions">
          <a className="nav-resume" href="/Varun-Patil-Resume.pdf" download>
            Résumé <span aria-hidden="true">↘</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
          </button>
        </div>
      </header>

      <main id="main">
        <section
          className="hero section-shell"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Software engineer · ML &amp; LLM
              systems
            </p>
            <h1 id="hero-title">
              Intelligence,
              <br />
              <em>built to work.</em>
            </h1>
            <p className="hero-description">
              I&apos;m Varun. I build language models, real-time systems, and
              products that make complex technology feel clear.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a className="quiet-link" href={links.email}>
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="hero-location">
              Based in Hyderabad <span>·</span> M.Tech @ IIIT Hyderabad
            </p>
          </div>
          <div
            className="engineering-note"
            aria-label="An illustration of my engineering focus"
          >
            <div className="note-top">
              <span>FIELD NOTES / 001</span>
              <span className="note-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="orbital-drawing" aria-hidden="true">
              <div className="orbital-ring ring-one" />
              <div className="orbital-ring ring-two" />
              <div className="orbital-ring ring-three" />
              <span className="orbital-node node-one" />
              <span className="orbital-node node-two" />
              <span className="orbital-node node-three" />
              <div className="orbital-center">
                vp<span>ENGINEERING</span>
              </div>
              <span className="orbital-label label-model">MODEL</span>
              <span className="orbital-label label-system">SYSTEM</span>
              <span className="orbital-label label-human">HUMAN</span>
            </div>
            <div className="note-bottom">
              <p>
                From first principles
                <br />
                <em>to the last interaction.</em>
              </p>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
          <div className="hero-metrics" aria-label="Selected project results">
            <div>
              <strong>
                25.3M<span> / model</span>
              </strong>
              <p>Parameters, built from scratch</p>
            </div>
            <div>
              <strong>1.18B</strong>
              <p>Tokens processed across two corpora</p>
            </div>
            <div>
              <strong>
                &lt;50<span> ms</span>
              </strong>
              <p>Atelier synchronization latency</p>
            </div>
          </div>
        </section>

        <section
          className="work-section section-shell"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading" data-reveal>
            <p className="eyebrow">01 / Selected work</p>
            <div>
              <h2 id="work-title">
                Depth in the details.
                <br />
                <em>Clarity in the experience.</em>
              </h2>
              <p>
                From training the model to designing the system around it. A
                closer look at what I build and how I measure it.
              </p>
            </div>
          </div>

          <article
            className="project transformer-project"
            data-reveal
            aria-labelledby="transformer-title"
          >
            <div className="project-copy">
              <p className="project-index">01 / LANGUAGE MODELS</p>
              <h3 id="transformer-title">
                Two languages.
                <br />
                Built from scratch.
              </h3>
              <p className="project-name">Hindi &amp; Nepali Transformer LMs</p>
              <p className="project-description">
                Two independent decoder-only Transformers, from clean corpora
                and custom tokenizers to pretraining, reasoning finetuning, and
                reproducible recovery.
              </p>
              <div className="project-stats">
                <div>
                  <strong>25.3M</strong>
                  <span>parameters each</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>decoder layers</span>
                </div>
                <div>
                  <strong>500M</strong>
                  <span>pretraining tokens each</span>
                </div>
              </div>
              <Tags
                items={["PyTorch", "SentencePiece", "Python", "Apple MPS"]}
              />
              <ExternalLink href={links.transformers} className="project-link">
                Explore the repository <span aria-hidden="true">↗</span>
              </ExternalLink>
            </div>
            <div className="project-visual language-visual">
              <div className="visual-label">
                <span>REASONING / HELD-OUT EVALUATION</span>
                <span>01—02</span>
              </div>
              <div
                className="language-switch"
                aria-label="Choose evaluation language"
              >
                {(Object.keys(languages) as (keyof typeof languages)[]).map(
                  (name) => (
                    <button
                      key={name}
                      aria-pressed={language === name}
                      onClick={() => setLanguage(name)}
                    >
                      {name}
                    </button>
                  ),
                )}
              </div>
              <div
                className="language-result"
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  className="language-script"
                  lang={language === "Hindi" ? "hi" : "ne"}
                >
                  {result.script}
                </span>
                <div className="result-heading">
                  <strong>
                    {result.after.toFixed(2)}
                    <span>%</span>
                  </strong>
                  <p>
                    Exact-match accuracy
                    <br />
                    after reasoning finetuning
                  </p>
                </div>
                <div className="comparison-row">
                  <div>
                    <span>Pretrained</span>
                    <strong>{result.before.toFixed(2)}%</strong>
                  </div>
                  <div className="chart-track">
                    <i style={{ width: `${result.before}%` }} />
                  </div>
                </div>
                <div className="comparison-row finetuned">
                  <div>
                    <span>Finetuned</span>
                    <strong>{result.after.toFixed(2)}%</strong>
                  </div>
                  <div className="chart-track">
                    <i style={{ width: `${result.after}%` }} />
                  </div>
                </div>
                <p className="evaluation-note">
                  1,800 held-out examples per language · candidate exact match
                </p>
              </div>
              <div
                className="architecture-strip"
                aria-label="12 decoder layers"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} />
                ))}
                <small>12 DECODER BLOCKS</small>
              </div>
            </div>
            <details className="project-details">
              <summary>
                Inside the build <span aria-hidden="true">+</span>
              </summary>
              <div className="detail-grid">
                <div>
                  <h4>Data with a lineage</h4>
                  <p>
                    1.18B training tokens processed with Unicode NFC
                    normalization, SHA-256 deduplication, deterministic splits,
                    and separate 10K-vocabulary BPE tokenizers with byte
                    fallback.
                  </p>
                </div>
                <div>
                  <h4>Training that can resume</h4>
                  <p>
                    Causal attention, pre-LayerNorm, GELU, and tied embeddings.
                    AdamW training uses gradient accumulation and clipping,
                    warmup, cosine decay, and checkpoints that restore
                    optimizer, scheduler, RNG, and data-stream state.
                  </p>
                </div>
              </div>
            </details>
          </article>

          <article
            className="project atelier-project"
            data-reveal
            aria-labelledby="atelier-title"
          >
            <div className="project-copy">
              <p className="project-index">02 / REAL-TIME COLLABORATION</p>
              <h3 id="atelier-title">
                One room.
                <br />
                People &amp; agents.
              </h3>
              <p className="project-name">Atelier</p>
              <p className="project-description">
                A collaborative code editor where local edits survive
                disconnection, agents work as CRDT participants, and an event
                log lets you revisit the room&apos;s exact history.
              </p>
              <div className="project-stats">
                <div>
                  <strong>20+</strong>
                  <span>concurrent users</span>
                </div>
                <div>
                  <strong>&lt;50 ms</strong>
                  <span>sync latency</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>AI agent roles</span>
                </div>
              </div>
              <Tags
                items={[
                  "Yjs / CRDTs",
                  "WebSockets",
                  "PostgreSQL",
                  "Prometheus",
                ]}
              />
              <ExternalLink href={links.atelier} className="project-link">
                Explore the repository <span aria-hidden="true">↗</span>
              </ExternalLink>
            </div>
            <div className="project-visual atelier-visual">
              <div className="visual-label">
                <span>ROOM / EVENT-SOURCED REPLAY</span>
                <span>ARCHITECTURE SKETCH</span>
              </div>
              <div className="editor-window">
                <div className="editor-header">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>room.ts</span>
                  <div className="peer-list">
                    {frame.peers.map((peer) => (
                      <b key={peer}>{peer}</b>
                    ))}
                  </div>
                </div>
                <div className="editor-code">
                  <span aria-hidden="true">
                    01
                    <br />
                    02
                    <br />
                    03
                  </span>
                  <pre>
                    <code>{frame.code}</code>
                  </pre>
                </div>
                <div className="editor-event" aria-live="polite">
                  {frame.label}
                </div>
              </div>
              <div className="replay-control">
                <label htmlFor="replay-position">
                  Explore a replay <span>0{replay + 1} / 03</span>
                </label>
                <input
                  id="replay-position"
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={replay}
                  aria-valuetext={frame.label}
                  onChange={(event) => setReplay(Number(event.target.value))}
                />
                <p>
                  {frame.note} <span>Illustrative sequence.</span>
                </p>
              </div>
              <div className="agent-team" aria-label="Five agent roles">
                {["Planner", "Coder", "Reviewer", "Tester", "Debugger"].map(
                  (agent, i) => (
                    <span key={agent}>
                      <i>0{i + 1}</i>
                      {agent}
                    </span>
                  ),
                )}
              </div>
            </div>
            <details className="project-details">
              <summary>
                Inside the build <span aria-hidden="true">+</span>
              </summary>
              <div className="detail-grid">
                <div>
                  <h4>Collaboration, even offline</h4>
                  <p>
                    Distributed WebSocket gateways, live presence, shared
                    cursors, and offline conflict resolution. Isolated
                    pseudo-terminals stream code execution through node-pty and
                    xterm.js for JavaScript, Python, C++, and Java.
                  </p>
                </div>
                <div>
                  <h4>Agents you can inspect</h4>
                  <p>
                    Planner, Coder, Reviewer, Tester, and Debugger agents use a
                    live tree-sitter code graph for retrieval-grounded prompts.
                    Proposed edits require human approval, with reasoning
                    visible during the run and in time-travel replay.
                  </p>
                </div>
              </div>
            </details>
          </article>

          <article
            className="project judgment-project"
            data-reveal
            aria-labelledby="judgment-title"
          >
            <div className="project-copy">
              <p className="project-index">
                03 / LLM INFERENCE &amp; VERIFICATION
              </p>
              <h3 id="judgment-title">
                Every claim.
                <br />
                Back to its source.
              </h3>
              <p className="project-name">Judgment Explained</p>
              <p className="project-description">
                A document-grounded RAG system with quantized LLM inference for
                Indian judgments. Structured tool calls trace supporting
                paragraphs, check who said what, and repair attribution errors.
              </p>
              <div className="project-stats">
                <div>
                  <strong>16</strong>
                  <span>judgments evaluated</span>
                </div>
                <div>
                  <strong>64</strong>
                  <span>controlled claims</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>system variants</span>
                </div>
              </div>
              <Tags
                items={[
                  "PyTorch",
                  "HF Transformers",
                  "BM25",
                  "Pydantic",
                  "RAG",
                ]}
              />
              <a className="project-link" href="#contact">
                Discuss the project <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="project-visual judgment-visual">
              <div className="visual-label">
                <span>EVIDENCE / BEFORE CONFIDENCE</span>
                <span>BENCHMARK RESULTS</span>
              </div>
              <div className="evidence-flow">
                <div>
                  <span>01</span>
                  <strong>Retrieve</strong>
                  <p>Fixed evidence pool</p>
                </div>
                <i aria-hidden="true">↓</i>
                <div>
                  <span>02</span>
                  <strong>Verify</strong>
                  <p>Speaker · status · source</p>
                </div>
                <i aria-hidden="true">↓</i>
                <div>
                  <span>03</span>
                  <strong>Attribute</strong>
                  <p>Paragraph-level provenance</p>
                </div>
              </div>
              <div className="evidence-results">
                <div>
                  <strong aria-label="6 percentage points fewer attribution errors">
                    −6<span title="percentage points"> pp</span>
                  </strong>
                  <p>
                    Attribution errors vs. generic
                    <br />
                    evidence-checking baseline
                  </p>
                </div>
                <div>
                  <strong>
                    90<span>%</span>
                  </strong>
                  <p>
                    Key-information
                    <br />
                    coverage retained
                  </p>
                </div>
              </div>
            </div>
            <details className="project-details">
              <summary>
                Inside the build <span aria-hidden="true">+</span>
              </summary>
              <div className="detail-grid">
                <div>
                  <h4>Bounded, structured verification</h4>
                  <p>
                    Judgments selected from the 7,130-pair IN-Abs corpus, with
                    PDF/text ingestion and BM25 passage retrieval.
                    Schema-validated tool calls, bounded retries, and
                    evidence-access controls enforce source-versus-claim speaker
                    and status checks.
                  </p>
                </div>
                <div>
                  <h4>Reproducible evaluation</h4>
                  <p>
                    Immutable snapshots, SHA-256 integrity checks, isolated
                    inference sessions, and execution traces. Automated
                    provenance and tool-boundary tests support paired analysis
                    of accuracy, coverage, repair success, latency, and token
                    usage.
                  </p>
                </div>
              </div>
            </details>
          </article>

          <div className="archive-heading" data-reveal>
            <div>
              <p className="eyebrow">The project shelf</p>
              <h3>More things I&apos;ve built.</h3>
            </div>
            <p>Earlier systems. Same curiosity.</p>
          </div>
          <div
            className="archive-filters"
            aria-label="Filter additional projects"
          >
            {[
              "All work",
              "Recommendation",
              "Computer vision",
              "Collaboration",
            ].map((category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {projects.length} {projects.length === 1 ? "project" : "projects"}{" "}
            shown
          </p>
          <div className="archive-grid">
            {projects.map((project) => (
              <ExternalLink
                href={project.href}
                key={project.name}
                className="archive-project"
              >
                <div className="archive-top">
                  <span>
                    {project.index} / {project.category}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <span className="archive-stack">{project.stack}</span>
              </ExternalLink>
            ))}
          </div>
        </section>

        <section
          className="journey-section"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">02 / Experience &amp; education</p>
              <div>
                <h2 id="journey-title">
                  Practice gives
                  <br />
                  <em>ideas their shape.</em>
                </h2>
                <p>
                  A foundation in computer science, experience building
                  software, and a closer understanding of the people who use it.
                </p>
              </div>
            </div>
            <div className="journey-list">
              <article data-reveal>
                <div className="journey-date">
                  AUG 2025 — PRESENT<span>Hyderabad</span>
                </div>
                <div>
                  <p className="journey-organization">IIIT Hyderabad</p>
                  <h3>M.Tech, Product Design &amp; Management</h3>
                  <p>
                    International Institute of Information Technology,
                    Hyderabad. Connecting technical depth with product thinking
                    and human needs.
                  </p>
                </div>
                <span className="journey-kind">Education</span>
              </article>
              <article data-reveal>
                <div className="journey-date">
                  JAN — JUL 2024<span>Pune</span>
                </div>
                <div>
                  <p className="journey-organization">Data Axle</p>
                  <h3>Software Engineering Intern</h3>
                  <p>
                    Developed backend services and web applications for customer
                    acquisition, business intelligence, and data management
                    platforms.
                  </p>
                  <ul className="experience-points">
                    <li>
                      Built REST APIs and data-processing workflows using C#,
                      ASP.NET Core, SQL Server, and React.
                    </li>
                    <li>
                      Improved performance through query optimization and
                      efficient database design.
                    </li>
                    <li>
                      Enhanced CI/CD, automated testing, and Azure DevOps
                      deployment pipelines.
                    </li>
                  </ul>
                </div>
                <span className="journey-kind">Experience</span>
              </article>
              <article data-reveal>
                <div className="journey-date">
                  AUG 2020 — JUN 2024<span>Pune</span>
                </div>
                <div>
                  <p className="journey-organization">
                    JSPM&apos;s Rajarshi Shahu College of Engineering
                  </p>
                  <h3>B.Tech, Computer Science Engineering</h3>
                  <p>
                    Algorithms, operating systems, databases, computer networks,
                    and object-oriented design: the fundamentals I keep building
                    on.
                  </p>
                </div>
                <span className="journey-kind">Education</span>
              </article>
            </div>
          </div>
        </section>

        <section
          className="about-section section-shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-copy" data-reveal>
            <p className="eyebrow">03 / How I work</p>
            <h2 id="about-title">
              Curious by nature.
              <br />
              <em>Precise by practice.</em>
            </h2>
            <p>
              I like understanding the whole path: where the data comes from,
              how a model learns, how state moves through a system, and what a
              person sees at the other end.
            </p>
            <p>
              My work spans machine learning, distributed systems, and product
              engineering. The thread through all three is simple: make the
              behavior clear, then make it dependable.
            </p>
          </div>
          <div className="principles" data-reveal>
            <div>
              <span>01</span>
              <h3>Build from understanding.</h3>
              <p>
                Work through the internals. Know why the architecture fits the
                problem.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Make evidence visible.</h3>
              <p>
                Measure the result, trace the source, and preserve the path that
                produced it.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>Keep people in the loop.</h3>
              <p>
                Give users useful feedback and control over the decisions that
                matter.
              </p>
            </div>
          </div>
        </section>

        <section
          className="skills-section section-shell"
          aria-labelledby="skills-title"
          data-reveal
        >
          <div className="skills-heading">
            <p className="eyebrow">The toolkit</p>
            <h2 id="skills-title">Tools follow the problem.</h2>
          </div>
          <div className="skills-grid">
            <div>
              <h3>Languages</h3>
              <p>Python · Java · C/C++ · C# · JavaScript · TypeScript · Rust</p>
            </div>
            <div>
              <h3>Machine learning &amp; LLMs</h3>
              <p>
                PyTorch · HF Transformers · Deep learning · LLM inference · RAG
                · SentencePiece
              </p>
            </div>
            <div>
              <h3>Distributed systems</h3>
              <p>
                Kafka · Redis · FAISS · Docker · WebSockets · CRDTs · PostgreSQL
              </p>
            </div>
            <div>
              <h3>Software engineering</h3>
              <p>
                React · ASP.NET Core · Node.js · Flask · FastAPI · REST APIs ·
                JUnit · Azure DevOps
              </p>
            </div>
          </div>
          <p className="fundamentals">
            <span>Underneath it all</span> Data structures &amp; algorithms ·
            Operating systems · DBMS · Computer networks · Object-oriented
            design
          </p>
        </section>

        <section
          className="recognition section-shell"
          aria-labelledby="recognition-title"
          data-reveal
        >
          <p className="eyebrow" id="recognition-title">
            04 / A few milestones
          </p>
          <div className="recognition-grid">
            <div>
              <span>PGEE CSE 2025</span>
              <strong>
                202<small>AIR</small>
              </strong>
              <p>Qualified for IIIT Hyderabad</p>
            </div>
            <div>
              <span>GATE CS 2025</span>
              <strong>
                98.14<small>%ile</small>
              </strong>
              <p>AIR 2849 · 170,000+ candidates</p>
            </div>
            <div>
              <span>SHAASTRA TECHATHON 2024</span>
              <strong>
                9<small>th</small>
              </strong>
              <p>IIT Madras · 829 entrants</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="section-shell">
          <div className="footer-heading">
            <div>
              <p className="eyebrow">05 / Next conversation</p>
              <h2>
                Good work starts
                <br />
                <em>with a conversation.</em>
              </h2>
            </div>
            <a
              href={links.email}
              className="contact-arrow"
              aria-label="Email Varun Patil"
            >
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a className="footer-email" href={links.email}>
            varunp685@gmail.com
          </a>
          <div className="footer-meta">
            <span>
              © {new Date().getFullYear()} Varun Patil · Hyderabad, India
            </span>
            <div>
              <ExternalLink href={links.github}>GitHub ↗</ExternalLink>
              <ExternalLink href={links.linkedin}>LinkedIn ↗</ExternalLink>
              <a href="/Varun-Patil-Resume.pdf" download>
                Résumé ↘
              </a>
            </div>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
