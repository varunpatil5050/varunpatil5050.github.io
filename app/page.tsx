"use client";

import Orbital from "./components/Orbital";
import AtelierStory from "./components/AtelierStory";
import HandScan from "./components/HandScan";
import { ArchitectureExplorer } from "./components/CaseStudyDetails";
import "./case-details.css";
import { Header, Footer, Arrow, usePortfolioMotion } from "./components/Site";
import { LanguagePreview, EvidencePreview } from "./components/ProjectVisuals";

export default function Home() {
  usePortfolioMotion();
  return (
    <>
      <Header />
      <main id="main-content">
        <section
          className="hero section-shell"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <i /> Varun Patil / Software engineer · AI & ML
            </p>
            <h1 id="hero-title">
              <span>Engineering</span>
              <em>intelligence</em>
              <span>into motion.</span>
            </h1>
            <div className="hero-bottom">
              <p>
                I’m Varun. I build where intelligent systems, software, and
                thoughtful product design meet.
              </p>
              <div className="hero-actions">
                <a className="line-link" href="#work">
                  Explore selected work <Arrow down />
                </a>
                <a className="line-link muted-link" href="#contact">
                  Start a conversation <Arrow />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <Orbital />
            <p className="figure-caption">
              <span>Fig. 01 — A system in motion</span>
              <span>Move to explore ↗</span>
            </p>
          </div>
          <div className="hero-ledger">
            <div>
              <strong>25.3M</strong>
              <span>Parameters per language model</span>
            </div>
            <div>
              <strong>
                &lt;50 <small>ms</small>
              </strong>
              <span>Atelier synchronization</span>
            </div>
            <div>
              <strong>
                &lt;15 <small>ms</small>
              </strong>
              <span>SignSense inference / frame</span>
            </div>
            <p className="ledger-note">
              Based in Hyderabad
              <br />
              Building across disciplines <span>↓</span>
            </p>
          </div>
        </section>

        <section
          className="work-section section-shell"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-intro" data-reveal>
            <p className="eyebrow">01 / Selected work</p>
            <div className="intro-columns">
              <h2 id="work-title">
                Deep systems.
                <br />
                <em>Human experiences.</em>
              </h2>
              <p>
                From language models built from scratch to tools that bring
                people together. A few different ways of making complex things
                useful.
              </p>
            </div>
          </div>
          <article
            id="atelier"
            className="feature feature-atelier"
            aria-labelledby="atelier-title"
            data-story
          >
            <div className="project-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  01 — Distributed systems / Creative tools
                </p>
                <h3
                  id="atelier-title"
                  style={{ viewTransitionName: "project-atelier" }}
                >
                  Atelier<span className="title-dot">.</span>
                </h3>
              </div>
              <p>
                One workspace.
                <br />
                <em>Many minds.</em>
              </p>
            </div>
            <AtelierStory />
            <div className="project-foot" data-reveal>
              <p>
                A collaborative coding environment where people and AI agents
                share state, not just a screen. CRDT synchronization, isolated
                terminals, and a replayable history.
              </p>
              <a className="pill-link" href="/work/atelier/">
                Inside the system <Arrow />
              </a>
            </div>
            <div className="project-facts" data-reveal>
              <span>
                <b>20+</b> concurrent users
              </span>
              <span>
                <b>&lt;50 ms</b> synchronization
              </span>
              <span>
                <b>5</b> agent roles
              </span>
              <small>Reported project results</small>
            </div>
          </article>
          <article
            id="transformer-lms"
            className="feature feature-language"
            aria-labelledby="language-title"
            data-story
          >
            <div className="language-composition" data-reveal="scene">
              <div className="language-intro">
                <p className="eyebrow">02 — TransformerLMs / Deep learning</p>
                <h3
                  id="language-title"
                  style={{ viewTransitionName: "project-transformer-lms" }}
                >
                  Language.
                  <br />
                  <em>From scratch.</em>
                </h3>
                <p>
                  Two independent decoder-only Transformers. Hindi and Nepali.
                  Built to understand every layer of the learning process.
                </p>
                <a className="pill-link" href="/work/transformer-lms/">
                  Explore TransformerLMs <Arrow />
                </a>
              </div>
              <LanguagePreview />
            </div>
            <div className="project-foot language-foot" data-reveal>
              <p>
                <b>25.3M parameters per model.</b> Custom tokenizers,
                reproducible training, and answer-only fine-tuning. An
                engineering study in what it takes to make a small language
                model reason.
              </p>
              <span className="mono-note">
                Python / PyTorch / SentencePiece
              </span>
            </div>
          </article>
          <article
            id="judgment-explained"
            className="feature feature-evidence"
            aria-labelledby="evidence-title"
            data-story
          >
            <div className="evidence-composition">
              <div className="evidence-intro" data-reveal>
                <p className="eyebrow">
                  03 — Judgment Explained / LLM verification
                </p>
                <h3
                  id="evidence-title"
                  style={{ viewTransitionName: "project-judgment-explained" }}
                >
                  Evidence,
                  <br />
                  <em>before eloquence.</em>
                </h3>
                <p>
                  Judgment Explained asks a precise question: can a language
                  model explain a legal judgment without losing who said what?
                </p>
                <a className="pill-link" href="/work/judgment-explained/">
                  Follow the evidence <Arrow />
                </a>
              </div>
              <div className="evidence-art" data-reveal="scene">
                <EvidencePreview />
              </div>
            </div>
            <div className="project-facts" data-reveal>
              <span>
                <b>16</b> judgments evaluated
              </span>
              <span>
                <b>64</b> controlled claims
              </span>
              <span>
                <b>6 pp</b> fewer attribution errors
              </span>
              <small>Against a generic evidence-checking baseline</small>
            </div>
          </article>
          <article
            id="streamrank"
            className="feature feature-streamrank"
            aria-labelledby="streamrank-title"
            data-story
          >
            <div className="project-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  04 — Machine learning / Recommendation systems
                </p>
                <h3
                  id="streamrank-title"
                  style={{ viewTransitionName: "project-streamrank" }}
                >
                  StreamRank<span className="title-dot">.</span>
                </h3>
              </div>
              <p>
                A better shortlist.
                <br />
                <em>A broader view.</em>
              </p>
            </div>
            <div className="streamrank-stage" data-reveal="scene">
              <ArchitectureExplorer slug="streamrank" />
            </div>
            <div className="project-foot" data-reveal>
              <p>
                Retrieval finds the candidates. Ranking brings relevance.
                Diversity adds variety. Serving completes the system. Four
                distinct responsibilities, trained on 12.5 million interactions.
              </p>
              <a className="pill-link" href="/work/streamrank/">
                Follow the pipeline <Arrow />
              </a>
            </div>
            <div className="project-facts" data-reveal>
              <span>
                <b>12.5M</b> training interactions
              </span>
              <span>
                <b>4</b> recommendation stages
              </span>
              <small>PyTorch / Kafka / FAISS / Redis</small>
            </div>
          </article>
          <article
            id="signsense"
            className="feature feature-signsense"
            aria-labelledby="signsense-title"
            data-story
          >
            <div className="project-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  05 — Computer vision / Temporal deep learning
                </p>
                <h3
                  id="signsense-title"
                  style={{ viewTransitionName: "project-signsense" }}
                >
                  SignSense<span className="title-dot">.</span>
                </h3>
              </div>
              <p>
                Movement.
                <br />
                <em>Made legible.</em>
              </p>
            </div>
            <div className="signsense-stage" data-reveal="scene">
              <HandScan />
            </div>
            <div className="project-foot" data-reveal>
              <p>
                From visual landmarks to temporal understanding. An ASL
                recognition pipeline with shared feature normalization, sequence
                models, and confidence-gated streaming inference.
              </p>
              <a className="pill-link" href="/work/signsense/">
                Explore SignSense <Arrow />
              </a>
            </div>
            <div className="project-facts" data-reveal>
              <span>
                <b>68%</b> test accuracy
              </span>
              <span>
                <b>0.92</b> held-out ROC-AUC
              </span>
              <span>
                <b>&lt;15 ms</b> inference / frame
              </span>
              <small>10-sign LSTM experiment · Reported project results</small>
            </div>
          </article>
        </section>

        <section
          className="about-section section-shell"
          id="about"
          aria-labelledby="about-title"
        >
          <figure className="about-identity" data-reveal>
            <div className="identity-artwork">
              <div className="identity-monogram" aria-hidden="true">
                <span>VP</span>
              </div>
              <p className="identity-perspective">01 / Perspective</p>
            </div>
            <figcaption>
              <strong>Varun Patil</strong>
              <span>Software engineer. Curious by design.</span>
              <span>Hyderabad, India ↗</span>
            </figcaption>
          </figure>
          <div className="about-copy">
            <p className="eyebrow" data-reveal>
              02 / A little context
            </p>
            <h2 id="about-title" data-reveal>
              I like understanding
              <br />
              the whole thing.
              <br />
              <em>Then making it better.</em>
            </h2>
            <div className="about-body" data-reveal>
              <p>
                That means looking beneath the interface: at how a model learns,
                how distributed state converges, and how a product earns its
                place in someone’s day.
              </p>
              <p>
                I’m pursuing an M.Tech in Product Design & Management at IIIT
                Hyderabad, after a computer science degree and a software
                engineering internship at Data Axle. It’s a deliberate mix of
                engineering depth and product perspective.
              </p>
            </div>
            <a
              className="text-link"
              href="/Varun-Patil-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              Read my résumé <Arrow />
            </a>
          </div>
        </section>
        <section
          className="journey-section"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="section-shell">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">03 / The foundations</p>
              <div className="intro-columns">
                <h2 id="journey-title">
                  A technical mind.
                  <br />
                  <em>A wider lens.</em>
                </h2>
                <p>The experience, education, and tools behind the work.</p>
              </div>
            </div>
            <div className="journey-grid">
              <div className="experience-column" data-reveal>
                <h3 className="eyebrow">Experience & education</h3>
                <div className="journey-entry">
                  <span className="entry-date">Jan — Jul 2024 · Pune</span>
                  <h4>Data Axle</h4>
                  <p className="entry-role">Software Engineering Intern</p>
                  <p>
                    Built backend services and web applications with C#, ASP.NET
                    Core, SQL Server, and React. Worked on REST APIs, data
                    processing, query optimization, and automated testing and
                    deployment with Azure DevOps.
                  </p>
                </div>
                <div className="journey-entry">
                  <span className="entry-date">Aug 2025 — Present</span>
                  <h4>IIIT Hyderabad</h4>
                  <p className="entry-role">
                    M.Tech · Product Design & Management
                  </p>
                </div>
                <div className="journey-entry">
                  <span className="entry-date">Aug 2020 — Jun 2024</span>
                  <h4>JSPM’s RSCOE, Pune</h4>
                  <p className="entry-role">
                    B.Tech · Computer Science Engineering
                  </p>
                </div>
              </div>
              <div className="capability-column" data-reveal>
                <h3 className="eyebrow">Technical repertoire</h3>
                <dl className="capabilities">
                  <div>
                    <dt>Software & systems</dt>
                    <dd>
                      Python, Java, C/C++, C#, JavaScript, TypeScript, REST
                      APIs, Docker
                    </dd>
                  </div>
                  <div>
                    <dt>AI & language</dt>
                    <dd>
                      PyTorch, deep learning, Hugging Face Transformers, LLM
                      inference, RAG, SentencePiece
                    </dd>
                  </div>
                  <div>
                    <dt>Realtime & data</dt>
                    <dd>
                      WebSockets, CRDTs, Yjs, Kafka, Redis, FAISS, PostgreSQL,
                      SQL Server
                    </dd>
                  </div>
                  <div>
                    <dt>Interfaces & backend</dt>
                    <dd>
                      React, Node.js, ASP.NET Core, FastAPI, Flask, automated
                      testing
                    </dd>
                  </div>
                  <div>
                    <dt>Computer science</dt>
                    <dd>
                      Data structures & algorithms, operating systems, networks,
                      database systems, object-oriented design
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="achievement-strip" data-reveal>
              <p className="eyebrow">A few milestones</p>
              <div>
                <strong>202</strong>
                <span>
                  All India Rank
                  <br />
                  IIIT-H PGEE CSE · 2025
                </span>
              </div>
              <div>
                <strong>
                  98.14<small>%ile</small>
                </strong>
                <span>
                  GATE CS · 2025
                  <br />
                  AIR 2,849 · 170K+ candidates
                </span>
              </div>
              <div>
                <strong>
                  9<small>th</small>
                </strong>
                <span>
                  Shaastra Techathon · 2024
                  <br />
                  IIT Madras · 829 entrants
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
