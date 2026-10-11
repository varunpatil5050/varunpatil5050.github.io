"use client";

import { useEffect, useId, useState } from "react";
import type { ProjectSection } from "../data/projects";

type ArchitectureStage = {
  title: string;
  label: string;
  description: string;
  input: string;
  output: string;
};

type Architecture = {
  title: string;
  subtitle: string;
  stages: ArchitectureStage[];
};

const architectures: Record<string, Architecture> = {
  streamrank: {
    title: "A funnel, not a single model.",
    subtitle: "Four separate responsibilities. One recommendation pipeline.",
    stages: [
      {
        title: "Retrieve",
        label: "Narrow the search",
        description:
          "Retrieve a candidate set before the more detailed ranking step. This first stage narrows the space that the rest of the pipeline needs to consider.",
        input: "Candidate space",
        output: "Retrieved candidates",
      },
      {
        title: "Rank",
        label: "Order for relevance",
        description:
          "Rank the retrieved candidates for relevance. Keeping this responsibility separate from retrieval makes the shortlist the focus of the ranking stage.",
        input: "Retrieved candidates",
        output: "Ranked candidates",
      },
      {
        title: "Diversify",
        label: "Make variety explicit",
        description:
          "Apply diversity after ranking. Variety is an explicit system stage rather than an assumed side effect of relevance scores.",
        input: "Ranked candidates",
        output: "Diversified selection",
      },
      {
        title: "Serve",
        label: "Complete the pipeline",
        description:
          "Deliver the resulting recommendation set. The system connects model work to a complete retrieval, ranking, diversity, and serving flow.",
        input: "Diversified selection",
        output: "Recommendation set",
      },
    ],
  },
  signsense: {
    title: "Movement becomes a sequence.",
    subtitle:
      "The representation stays consistent from training to the live stream.",
    stages: [
      {
        title: "Landmarks",
        label: "Observe the movement",
        description:
          "MediaPipe Holistic extracts visual landmarks from frames. These landmarks become the input representation for temporal sign recognition.",
        input: "Video frames",
        output: "Holistic landmarks",
      },
      {
        title: "Normalize",
        label: "Keep the features aligned",
        description:
          "Convert landmarks into normalized 126-dimensional temporal feature sequences. Training and streaming inference use the same normalization.",
        input: "Landmark sequences",
        output: "Normalized 126-D features",
      },
      {
        title: "Model",
        label: "Preserve temporal context",
        description:
          "A temporal buffer provides context for sequence inference. The modeling work includes LSTM, TCN, and Transformer architectures; the reported accuracy experiment uses an LSTM.",
        input: "Buffered feature sequence",
        output: "Sign prediction",
      },
      {
        title: "Gate",
        label: "Control prediction delivery",
        description:
          "Confidence gating controls when a prediction is emitted. FastAPI WebSockets connect the live streaming inference workflow.",
        input: "Model prediction",
        output: "Confidence-gated prediction",
      },
    ],
  },
  syncspace: {
    title: "Local interaction. Shared state.",
    subtitle: "The document manages convergence. The relay carries updates.",
    stages: [
      {
        title: "Edit locally",
        label: "Start at the editor",
        description:
          "CodeMirror 6 provides the local editing surface. Local interaction is separate from the delivery of updates across the network.",
        input: "Local edits",
        output: "Editor changes",
      },
      {
        title: "Synchronize",
        label: "Let the document converge",
        description:
          "Yjs manages the shared CRDT document and synchronization. The shared-document layer, rather than the relay, owns convergence.",
        input: "Editor changes",
        output: "CRDT document updates",
      },
      {
        title: "Relay",
        label: "Keep transport small",
        description:
          "A stateless FastAPI WebSocket relay carries synchronization messages between connected collaborators. Transport remains distinct from the editing engine.",
        input: "Synchronization messages",
        output: "Collaborator updates",
      },
      {
        title: "Share presence",
        label: "Make collaboration visible",
        description:
          "Shared cursors provide live collaboration context alongside document edits. Presence complements the shared document without replacing its synchronization model.",
        input: "Collaborator context",
        output: "Shared cursors",
      },
    ],
  },
};

function PipelineDiagram({ kind, active }: { kind: string; active: number }) {
  if (kind === "syncspace") {
    return (
      <div
        className="architecture-network"
        aria-hidden="true"
        data-stage={active}
      >
        <div className="network-editor network-editor-local">
          <div className="network-document">
            <i />
            <i />
            <i />
            <i />
            <span />
          </div>
          <span>Local editor</span>
          <small>CodeMirror 6 + Yjs</small>
        </div>
        <div className="network-connection">
          <span>↔</span>
          <small>document updates</small>
        </div>
        <div className="network-relay">
          <span className="relay-symbol">↔</span>
          <b>WebSocket relay</b>
          <small>FastAPI / stateless</small>
        </div>
        <div className="network-connection">
          <span>↔</span>
          <small>document updates</small>
        </div>
        <div className="network-editor network-editor-peer">
          <div className="network-document">
            <i />
            <i />
            <i />
            <i />
            <span />
          </div>
          <span>Collaborator</span>
          <small>CodeMirror 6 + Yjs</small>
        </div>
        <p className="network-presence">
          <i />
          <span>Shared cursors / live collaboration context</span>
          <i />
        </p>
      </div>
    );
  }

  return (
    <div
      className={`architecture-pipeline ${kind === "signsense" ? "signal-pipeline" : "ranking-pipeline"}`}
      aria-hidden="true"
      data-stage={active}
    >
      {[0, 1, 2, 3].map((stage) => (
        <div
          className={`pipeline-cell ${active === stage ? "is-active" : ""}`}
          key={stage}
        >
          <span className="pipeline-position">0{stage + 1}</span>
          <div className={`pipeline-glyph glyph-${stage}`}>
            {kind === "signsense" && stage === 0 ? (
              <svg viewBox="0 0 120 120" fill="none">
                <path
                  d="m40 102-21-22-7-24 7-3 14 20-6-50 8-1 9 43-1-56 9-1 3 56 9-50 8 2-6 52 12-34 8 3-9 39-9 20-13 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m40 102 8-27-15-2m15 2-4-10m4 10 7-11m-7 11 18-7m-18 7 26 2"
                  stroke="currentColor"
                  opacity=".5"
                />
                {[
                  [40, 102],
                  [48, 75],
                  [33, 73],
                  [27, 23],
                  [44, 65],
                  [43, 9],
                  [55, 64],
                  [64, 14],
                  [66, 68],
                  [78, 34],
                  [74, 77],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.4" fill="currentColor" />
                ))}
              </svg>
            ) : (
              Array.from({ length: kind === "signsense" ? 12 : 6 }, (_, i) => (
                <i key={i} />
              ))
            )}
          </div>
          <strong>{architectures[kind].stages[stage].title}</strong>
          {stage < 3 && <span className="pipeline-connector">→</span>}
        </div>
      ))}
    </div>
  );
}

export function ArchitectureExplorer({ slug }: { slug: string }) {
  const [selected, setSelected] = useState(0);
  const descriptionId = useId();
  const architecture = architectures[slug];
  if (!architecture) return null;
  const stage = architecture.stages[selected];

  return (
    <section
      className={`architecture-explorer explorer-${slug}`}
      aria-label="Interactive system architecture"
    >
      <header className="architecture-explorer-heading">
        <div>
          <p>
            System study /{" "}
            {slug === "signsense"
              ? "Temporal recognition"
              : slug === "streamrank"
                ? "Recommendation"
                : "Shared state"}
          </p>
          <h2>{architecture.title}</h2>
        </div>
        <span>
          Explore the architecture <span aria-hidden="true">↘</span>
        </span>
      </header>
      <p className="architecture-subtitle">{architecture.subtitle}</p>
      <PipelineDiagram kind={slug} active={selected} />
      <div
        className="architecture-stage-controls"
        role="group"
        aria-label="Select an architecture stage"
      >
        {architecture.stages.map((item, i) => (
          <button
            type="button"
            key={item.title}
            aria-pressed={selected === i}
            aria-controls={descriptionId}
            onClick={() => setSelected(i)}
          >
            <span>0{i + 1}</span>
            {item.title}
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>
      <div
        className="architecture-stage-detail"
        id={descriptionId}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="stage-description">
          <span>
            0{selected + 1} / {stage.title}
          </span>
          <h3>{stage.label}</h3>
          <p>{stage.description}</p>
        </div>
        <div className="stage-io">
          <div>
            <span>Input</span>
            <p>{stage.input}</p>
          </div>
          <i aria-hidden="true">↓</i>
          <div>
            <span>Output</span>
            <p>{stage.output}</p>
          </div>
        </div>
      </div>
      <p className="architecture-caption">
        Conceptual architecture illustration. Select a stage to inspect its
        role—not a live backend, model output, or product screenshot.
      </p>
    </section>
  );
}

export function CaseStudyReadingNav({
  sections,
}: {
  sections: ProjectSection[];
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const chapters = sections
      .map((_, i) => document.getElementById(`chapter-${i + 1}`))
      .filter((element): element is HTMLElement => !!element);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!chapters.length) return;
      const readingLine = Math.min(210, window.innerHeight * 0.3);
      const rectangles = chapters.map((chapter) =>
        chapter.getBoundingClientRect(),
      );
      let current = 0;
      rectangles.forEach((rectangle, i) => {
        if (rectangle.top <= readingLine) current = i;
      });
      setActive(current);
      const start = rectangles[0].top + window.scrollY - readingLine;
      const end =
        rectangles[rectangles.length - 1].bottom +
        window.scrollY -
        window.innerHeight * 0.7;
      setProgress(
        Math.round(
          Math.max(
            0,
            Math.min(1, (window.scrollY - start) / Math.max(1, end - start)),
          ) * 100,
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <aside
      className="case-contents case-reading-nav"
      aria-label="Case study contents"
    >
      <div className="reading-heading">
        <p className="eyebrow">In this study</p>
        <span>
          0{active + 1} / 0{sections.length}
        </span>
      </div>
      <div
        className="case-reading-track"
        role="progressbar"
        aria-label="Case study reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <i style={{ width: `${progress}%` }} />
      </div>
      <nav aria-label="Case study chapters">
        {sections.map((section, i) => (
          <a
            key={section.title}
            href={`#chapter-${i + 1}`}
            aria-current={active === i ? "location" : undefined}
          >
            <span>0{i + 1}</span>
            {section.title}
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </nav>
      <p className="reading-note">
        Read at your own pace.
        <br />
        Or jump straight to the details.
      </p>
    </aside>
  );
}
