"use client";

import { useEffect } from "react";
import type { PointerEvent } from "react";

const links = {
  github: "https://github.com/varunpatil5050",
  linkedin: "https://www.linkedin.com/in/varun-patil-54060b177/",
  email: "mailto:varunp685@gmail.com",
  atelier: "https://github.com/varunpatil5050/Atelier",
  streamRank: "https://github.com/varunpatil5050/StreamRank",
  signSense: "https://github.com/varunpatil5050/SignSense",
  syncSpace: "https://github.com/varunpatil5050/SyncSpace",
};

function ExternalLink({ href, children, className = "" }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function setTilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--tilt-x", `${x * 7}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${y * -7}deg`);
  event.currentTarget.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
  event.currentTarget.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const updateProgress = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );

    reveals.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    document.body.classList.add("site-ready");

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--hero-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 22}px`);
    event.currentTarget.style.setProperty("--hero-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 22}px`);
  };

  return (
    <main>
      <div className="scroll-line" aria-hidden="true"><i /></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Varun Patil, back to top">
          <span className="brand-mark">V</span>
          <span>Varun Patil</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-resume" href="/Varun-Patil-Resume.pdf" download>
          Résumé <span aria-hidden="true">↘</span>
        </a>
      </header>

      <section className="hero" id="top" onPointerMove={moveHero} aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker hero-kicker"><span /> Software engineer · ML systems</p>
          <h1 id="hero-title">
            Engineering <em>intelligence</em><br />
            into motion.
          </h1>
          <div className="hero-lower">
            <p>
              I&apos;m Varun—an engineer at the intersection of machine learning,
              distributed systems, and thoughtful product design.
            </p>
            <div className="hero-actions">
              <a className="text-link" href="#work">Selected work <span aria-hidden="true">↓</span></a>
              <a className="text-link text-link-muted" href={links.email}>Start a conversation <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>

        <div className="signal-stage" aria-label="Interactive overview of Varun's engineering focus">
          <div className="signal-aura" aria-hidden="true" />
          <span className="signal-label signal-label-a">MODEL</span>
          <span className="signal-label signal-label-b">SYSTEM</span>
          <span className="signal-label signal-label-c">PRODUCT</span>
          <div className="signal-orbit orbit-one" aria-hidden="true"><i /><i /><i /></div>
          <div className="signal-orbit orbit-two" aria-hidden="true"><i /><i /></div>
          <div className="signal-core" aria-hidden="true"><span>VP</span><small>ENGINEERING</small></div>
          <p className="signal-caption"><span>●</span> Open to ambitious problems</p>
        </div>

        <div className="hero-metrics" aria-label="Selected project metrics">
          <div><strong>12.5M</strong><span>interactions modeled</span></div>
          <div><strong>&lt;50 ms</strong><span>collaboration sync</span></div>
          <div><strong>&lt;15 ms</strong><span>vision inference</span></div>
          <div className="metric-note"><span>Based in Hyderabad</span><span>Scroll to explore ↘</span></div>
        </div>
      </section>

      <section className="statement section-shell" data-reveal>
        <p className="kicker"><span>01</span> Point of view</p>
        <p className="statement-copy">
          Complex on the inside.<br />
          <em>Effortless on the surface.</em>
        </p>
        <p className="statement-note">
          I build systems where architecture, intelligence, and interface reinforce one another—
          because speed is only useful when people can feel it.
        </p>
      </section>

      <section className="work-section section-shell" id="work" aria-labelledby="work-title">
        <div className="section-intro" data-reveal>
          <p className="kicker"><span>02</span> Selected systems</p>
          <h2 id="work-title">Work with a pulse.</h2>
          <p>Three end-to-end builds, each shaped around a hard engineering constraint.</p>
        </div>

        <div className="project-stack">
          <article className="project-card atelier-card" data-reveal>
            <div className="project-copy">
              <div className="project-topline"><span>01 / COLLABORATION</span><span>OPEN SOURCE</span></div>
              <h3>Atelier</h3>
              <p className="project-lead">A multiplayer cloud IDE where people and AI agents share one live room.</p>
              <p className="project-body">
                CRDT-backed editing, shared terminals, repository intelligence, and exact session replay—
                composed as one resilient collaboration system.
              </p>
              <div className="project-meta">
                <div><strong>20+</strong><span>live users</span></div>
                <div><strong>&lt;50 ms</strong><span>sync latency</span></div>
                <div><strong>6</strong><span>languages</span></div>
              </div>
              <div className="project-tags"><span>Go</span><span>Rust</span><span>TypeScript</span><span>Yjs</span><span>WebSockets</span></div>
              <ExternalLink className="project-action" href={links.atelier}>Explore repository <span aria-hidden="true">↗</span></ExternalLink>
            </div>

            <div className="project-scene" onPointerMove={setTilt} onPointerLeave={resetTilt}>
              <div className="scene-surface atelier-surface">
                <div className="scene-bar"><span>atelier / room-01</span><span className="live-pill"><i /> 3 live</span></div>
                <div className="atelier-workspace">
                  <div className="file-rail"><i /><i /><i /><i /></div>
                  <div className="editor-panel">
                    <div className="editor-tabs"><span>system.ts</span><span>agent.go</span></div>
                    <div className="code-lines" aria-hidden="true">
                      <span style={{width:"72%"}} /><span style={{width:"48%"}} /><span style={{width:"83%"}} />
                      <span style={{width:"61%"}} /><span style={{width:"38%"}} /><span style={{width:"76%"}} />
                    </div>
                    <span className="peer-cursor peer-a">VARUN</span>
                    <span className="peer-cursor peer-b">AGENT</span>
                  </div>
                  <div className="presence-panel">
                    <small>ROOM</small><strong>Converged</strong>
                    <div className="avatar-row"><i>V</i><i>A</i><i>R</i></div>
                    <div className="mini-wave" aria-hidden="true"><span /><span /><span /><span /><span /></div>
                  </div>
                </div>
                <div className="scene-status"><span>CRDT EVENT LOG · RECORDING</span><strong>ALL PEERS IN SYNC</strong></div>
              </div>
            </div>
          </article>

          <article className="project-card stream-card" data-reveal>
            <div className="project-copy">
              <div className="project-topline"><span>02 / RECOMMENDATION</span><span>OPEN SOURCE</span></div>
              <h3>StreamRank</h3>
              <p className="project-lead">A recommendation engine that learns at the speed of a swipe.</p>
              <p className="project-body">
                A four-stage funnel for retrieval, ranking, diversity, and serving—trained on real behavior
                and continuously refreshed by live session events.
              </p>
              <div className="project-meta">
                <div><strong>12.5M</strong><span>interactions</span></div>
                <div><strong>3 ms</strong><span>serving</span></div>
                <div><strong>Top 10</strong><span>personalized</span></div>
              </div>
              <div className="project-tags"><span>PyTorch</span><span>Kafka</span><span>Redis</span><span>FAISS</span><span>Kubernetes</span></div>
              <ExternalLink className="project-action" href={links.streamRank}>Explore repository <span aria-hidden="true">↗</span></ExternalLink>
            </div>

            <div className="project-scene" onPointerMove={setTilt} onPointerLeave={resetTilt}>
              <div className="scene-surface stream-surface">
                <div className="scene-bar"><span>stream / live request</span><span className="latency">≈ 3 ms</span></div>
                <div className="ranking-stage">
                  <div className="ranking-card rank-left"><span>02</span><strong>.91</strong><small>DIVERSE</small></div>
                  <div className="ranking-card rank-main"><span>01</span><strong>.96</strong><small>RELEVANT</small></div>
                  <div className="ranking-card rank-right"><span>03</span><strong>.87</strong><small>FRESH</small></div>
                </div>
                <div className="funnel-row">
                  <div><span>01</span><strong>Retrieve</strong></div><i />
                  <div><span>02</span><strong>Rank</strong></div><i />
                  <div><span>03</span><strong>Balance</strong></div><i />
                  <div><span>04</span><strong>Serve</strong></div>
                </div>
                <div className="scene-status"><span>LIVE EVENT RECEIVED</span><strong>FEED RE-RANKED</strong></div>
              </div>
            </div>
          </article>

          <article className="project-card sign-card" data-reveal>
            <div className="project-copy">
              <div className="project-topline"><span>03 / COMPUTER VISION</span><span>OPEN SOURCE</span></div>
              <h3>SignSense</h3>
              <p className="project-lead">Real-time sign recognition designed for the rhythm of conversation.</p>
              <p className="project-body">
                MediaPipe landmarks become normalized temporal sequences, travel through trained sequence models,
                and stream back to a React interface in milliseconds.
              </p>
              <div className="project-meta">
                <div><strong>0.92</strong><span>ROC-AUC</span></div>
                <div><strong>126-D</strong><span>features</span></div>
                <div><strong>&lt;15 ms</strong><span>per frame</span></div>
              </div>
              <div className="project-tags"><span>PyTorch</span><span>MediaPipe</span><span>OpenCV</span><span>FastAPI</span><span>ONNX</span></div>
              <ExternalLink className="project-action" href={links.signSense}>Explore repository <span aria-hidden="true">↗</span></ExternalLink>
            </div>

            <div className="project-scene" onPointerMove={setTilt} onPointerLeave={resetTilt}>
              <div className="scene-surface sign-surface">
                <div className="scene-bar"><span>camera / mediapipe</span><span className="live-pill"><i /> live</span></div>
                <div className="vision-view">
                  <div className="vision-grid" aria-hidden="true" />
                  <div className="gesture" aria-hidden="true">
                    <i className="gesture-palm" />
                    <i className="gesture-finger gf-one" /><i className="gesture-finger gf-two" />
                    <i className="gesture-finger gf-three" /><i className="gesture-finger gf-four" />
                    <b className="landmark lm-one" /><b className="landmark lm-two" /><b className="landmark lm-three" />
                    <b className="landmark lm-four" /><b className="landmark lm-five" />
                  </div>
                  <div className="focus-corners" aria-hidden="true"><i /><i /><i /><i /></div>
                  <div className="vision-scan" aria-hidden="true" />
                </div>
                <div className="prediction-row">
                  <div><small>PREDICTION</small><strong>HELLO</strong></div>
                  <div><small>ROC-AUC</small><strong>0.92</strong></div>
                  <div className="confidence-track"><i /></div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="more-work" data-reveal>
          <div className="more-work-head">
            <p className="kicker"><span>+</span> More work</p>
            <p>Focused experiments and architectural studies.</p>
          </div>
          <ExternalLink className="more-project" href={links.syncSpace}>
            <span className="more-index">04</span>
            <div className="more-project-copy">
              <h3>SyncSpace</h3>
              <p>
                A local-first collaborative code editor with shared cursors,
                CRDT synchronization, and a stateless WebSocket relay.
              </p>
            </div>
            <div className="more-tech">
              <span>CodeMirror 6</span><span>Yjs</span><span>FastAPI</span><span>WebSockets</span>
            </div>
            <span className="more-arrow" aria-hidden="true">↗</span>
          </ExternalLink>
        </div>
      </section>

      <section className="journey-section" id="journey" aria-labelledby="journey-title">
        <div className="section-shell">
          <div className="section-intro journey-intro" data-reveal>
            <p className="kicker"><span>03</span> Journey</p>
            <h2 id="journey-title">Built through practice.</h2>
            <p>Engineering depth, product context, and the discipline to keep learning.</p>
          </div>
          <div className="journey-list">
            <article data-reveal>
              <span className="journey-year">2025 — NOW</span>
              <div><small>IIIT Hyderabad</small><h3>M.Tech, Product Design &amp; Management</h3><p>Designing better systems by understanding the people and decisions around them.</p></div>
              <span className="journey-place">Hyderabad</span>
            </article>
            <article data-reveal>
              <span className="journey-year">JAN — JUL 2024</span>
              <div><small>Data Axle</small><h3>Software Engineering Intern</h3><p>Backend services, web applications, databases, delivery pipelines, and production-minded engineering.</p></div>
              <span className="journey-place">Pune</span>
            </article>
            <article data-reveal>
              <span className="journey-year">2020 — 2024</span>
              <div><small>JSPM&apos;s RSCOE</small><h3>B.Tech, Computer Science Engineering</h3><p>The fundamentals: algorithms, systems, networks, databases, and how software fits together.</p></div>
              <span className="journey-place">Pune</span>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="about-lead" data-reveal>
          <p className="kicker"><span>04</span> Working philosophy</p>
          <h2 id="about-title">Precision,<br /><em>with a pulse.</em></h2>
          <p>
            The best engineering feels inevitable: every layer has a reason,
            every interaction has a response, and every metric connects back to a person.
          </p>
        </div>
        <div className="principles">
          <article data-reveal><span>01</span><h3>Make it observable.</h3><p>If a system can&apos;t explain itself, it isn&apos;t finished. Instrument the path, expose the signal, learn from the edge cases.</p></article>
          <article data-reveal><span>02</span><h3>Design the feedback loop.</h3><p>Real-time products live or die by feedback. Latency, state, and confidence should be felt—not hidden.</p></article>
          <article data-reveal><span>03</span><h3>Earn the complexity.</h3><p>Use the simplest architecture that protects the experience. Add machinery only when the problem demands it.</p></article>
        </div>
      </section>

      <section className="capability-band">
        <div className="section-shell capability-grid">
          <div data-reveal><span>01</span><h3>Machine learning</h3><p>PyTorch · Transformers · Two-Tower Networks · DeepFM · LightGBM</p></div>
          <div data-reveal><span>02</span><h3>Distributed systems</h3><p>Kafka · Redis · CRDTs · WebSockets · FAISS · Docker · Kubernetes</p></div>
          <div data-reveal><span>03</span><h3>Product engineering</h3><p>React · TypeScript · Node.js · FastAPI · ASP.NET Core · PostgreSQL</p></div>
        </div>
      </section>

      <section className="recognition section-shell" data-reveal aria-label="Academic achievements">
        <p className="kicker"><span>05</span> Recognition</p>
        <div className="recognition-grid">
          <div><small>PGEE CSE 2025</small><strong>AIR 202</strong><span>Admitted to IIIT Hyderabad</span></div>
          <div><small>GATE CS 2025</small><strong>98.14<sup>%ile</sup></strong><span>170K+ candidates</span></div>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <p className="kicker"><span>06</span> Next conversation</p>
          <h2>Have a hard problem<br />worth <em>solving?</em></h2>
          <a className="footer-email" href={links.email}>varunp685@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="footer-meta">
            <span>© 2026 Varun Patil</span>
            <div>
              <ExternalLink href={links.github}>GitHub ↗</ExternalLink>
              <ExternalLink href={links.linkedin}>LinkedIn ↗</ExternalLink>
              <a href="/Varun-Patil-Resume.pdf" download>Résumé ↘</a>
            </div>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
