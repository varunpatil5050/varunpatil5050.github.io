"use client";
import { useState } from "react";
import type { CSSProperties } from "react";
const frames = [
  {
    label: "A shared beginning",
    code: [
      "const workspace = connect(room);",
      "// People join the same document",
      "workspace.observe(changes);",
    ],
    message:
      "A Yjs document holds shared state. Presence keeps collaborators visible.",
    peers: ["V", "S"],
    state: "Shared state",
  },
  {
    label: "An agent joins the room",
    code: [
      "const proposal = agent.propose(context);",
      "// The human stays in control",
      "await review(proposal);",
    ],
    message:
      "Planner, Coder, Reviewer, Tester, and Debugger participate in the collaboration flow. Edits require approval.",
    peers: ["V", "S", "A"],
    state: "Human approval",
  },
  {
    label: "Every change has a history",
    code: [
      "const snapshot = replay(eventLog, time);",
      "// Reconstruct edits and presence",
      "renderReadonly(snapshot);",
    ],
    message:
      "The CRDT event log reconstructs document state and presence for read-only time travel.",
    peers: ["V", "S", "A"],
    state: "Replayable history",
  },
];
function CodeSyntax({ line }: { line: string }) {
  if (line.trimStart().startsWith("//"))
    return <span className="syntax-comment">{line}</span>;
  return (
    <>
      {line
        .split(
          /(\b(?:const|await|connect|observe|propose|review|replay|renderReadonly)\b)/g,
        )
        .map((part, index) => {
          const kind = /^(const|await)$/.test(part)
            ? "syntax-keyword"
            : /^(connect|observe|propose|review|replay|renderReadonly)$/.test(
                  part,
                )
              ? "syntax-function"
              : undefined;
          return (
            <span key={index} className={kind}>
              {part}
            </span>
          );
        })}
    </>
  );
}
export function AtelierPreview() {
  const [step, setStep] = useState(0);
  const frame = frames[step];
  return (
    <div className="atelier-preview">
      <div className="workspace-top">
        <span className="workspace-logo">
          a<span>telier</span>
        </span>
        <span className="workspace-room">A space to build, together</span>
        <div
          className="peer-list"
          aria-label={`${frame.peers.length} illustrated participants`}
        >
          {frame.peers.map((peer, i) => (
            <span key={peer} style={{ "--peer": i } as CSSProperties}>
              {peer}
            </span>
          ))}
        </div>
      </div>
      <div className="workspace-body">
        <div className="workspace-sidebar">
          <span className="tiny-label">Workspace</span>
          <div className="file-line">⌄ shared-project</div>
          <div className="file-line indent">⌄ src</div>
          <div className="file-line file-active">◇ collaboration.ts</div>
          <div className="file-line indent">◇ agents.ts</div>
          <div className="file-line indent">◇ replay.ts</div>
          <div className="sidebar-bottom">
            <span className="tiny-label">Architecture</span>
            <span>Yjs / CRDT</span>
            <i />
            <span>WebSocket gateways</span>
            <i />
            <span>Event log</span>
          </div>
        </div>
        <div className="workspace-editor">
          <div className="editor-tab">
            ◇ collaboration.ts <span>Illustrative pseudocode</span>
          </div>
          <div className="editor-content" aria-live="polite">
            <span className="code-comment">// {frame.label}</span>
            {frame.code.map((line, i) => (
              <div className="code-line" key={`${step}-${i}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <code>
                  <CodeSyntax line={line} />
                </code>
              </div>
            ))}
            <div className="code-cursor">
              Varun
              <span />
            </div>
          </div>
          <div className="workspace-terminal">
            <span className="tiny-label">State, without the guesswork</span>
            <p key={step}>{frame.message}</p>
            <div className="terminal-state">
              <i />
              {frame.state}
            </div>
          </div>
        </div>
      </div>
      <div className="ide-status">
        <span>TypeScript · Illustrative code</span>
        <span>Local → shared → replay</span>
      </div>
      <div className="workspace-controls">
        <span className="tiny-label">Explore the flow</span>
        <div
          className="flow-buttons"
          role="group"
          aria-label="Illustrative collaboration sequence"
        >
          {["Join", "Propose", "Replay"].map((label, i) => (
            <button
              key={label}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
            >
              <span>0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="visual-disclaimer">
        Interactive architecture sketch — not a live backend or product
        screenshot.
      </p>
    </div>
  );
}
const languages = {
  Hindi: { script: "हिन्दी", before: 30.33, after: 70.67 },
  Nepali: { script: "नेपाली", before: 31.11, after: 63.61 },
};
export function LanguagePreview() {
  const [language, setLanguage] = useState<keyof typeof languages>("Hindi");
  const result = languages[language];
  return (
    <div className="language-preview">
      <div className="language-graphic" aria-hidden="true">
        <span className="language-ring ring-one" />
        <span className="language-ring ring-two" />
        <span className="script-word" key={language}>
          {result.script}
        </span>
        <span className="model-label">12 layers · 25.3M parameters</span>
        <span className="token token-left">अ →</span>
        <span className="token token-right">→ 10K BPE</span>
      </div>
      <div className="evaluation-panel">
        <div className="evaluation-head">
          <span className="tiny-label">Reasoning / Held-out evaluation</span>
          <div
            className="language-toggle"
            role="group"
            aria-label="Evaluation language"
          >
            {Object.keys(languages).map((name) => (
              <button
                key={name}
                aria-pressed={name === language}
                onClick={() => setLanguage(name as keyof typeof languages)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="evaluation-results" aria-live="polite">
          <div className="evaluation-row">
            <span>Pretrained</span>
            <div className="result-track">
              <i style={{ width: `${result.before}%` }} />
            </div>
            <b>{result.before.toFixed(2)}%</b>
          </div>
          <div className="evaluation-row after">
            <span>Fine-tuned</span>
            <div className="result-track">
              <i style={{ width: `${result.after}%` }} />
            </div>
            <b>{result.after.toFixed(2)}%</b>
          </div>
        </div>
        <p>
          Candidate exact match · 1,800 held-out examples per language.
          <br />
          Answer-only SFT on synthetic comparative and transitive reasoning.
        </p>
      </div>
    </div>
  );
}
const evidenceSteps = [
  {
    title: "Find the source.",
    eyebrow: "01 / Retrieve",
    text: "BM25 passage retrieval over judgments. A fixed evidence pool keeps comparisons controlled.",
    lines: ["Judgment paragraphs", "BM25 retrieval", "Fixed evidence pool"],
  },
  {
    title: "Ask who said it.",
    eyebrow: "02 / Verify",
    text: "Schema-validated tool calls check the claim’s source, speaker, and status. Bounded retries keep verification contained.",
    lines: ["Source ↔ claim", "Speaker & status", "Attribution check"],
  },
  {
    title: "Leave a trail.",
    eyebrow: "03 / Inspect",
    text: "Immutable snapshots, SHA-256 hashes, and execution traces make each experiment inspectable and reproducible.",
    lines: ["Evidence provenance", "Execution trace", "Immutable snapshot"],
  },
];
export function EvidencePreview() {
  const [step, setStep] = useState(0);
  const content = evidenceSteps[step];
  return (
    <div className="evidence-preview">
      <div className="evidence-sheet">
        <div className="sheet-header">
          <span>JE / Judgment Explained</span>
          <span>Research notes ↗</span>
        </div>
        <p className="tiny-label" key={`label-${step}`}>
          {content.eyebrow}
        </p>
        <h4 key={`title-${step}`}>{content.title}</h4>
        <div
          className="evidence-chain"
          key={`chain-${step}`}
          aria-label="System flow"
        >
          {content.lines.map((line, i) => (
            <div key={line}>
              <span>0{i + 1}</span>
              <strong>{line}</strong>
              {i < 2 && <i aria-hidden="true">↓</i>}
            </div>
          ))}
        </div>
        <p className="evidence-description" aria-live="polite">
          {content.text}
        </p>
        <div className="sheet-footer">
          <span>Source → claim → verification</span>
          <span>01—03</span>
        </div>
      </div>
      <div
        className="evidence-tabs"
        role="group"
        aria-label="Explore the verification architecture"
      >
        {["Retrieve", "Verify", "Inspect"].map((label, i) => (
          <button
            key={label}
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="visual-disclaimer">
        Architecture illustration, not a generated legal explanation.
      </p>
    </div>
  );
}
export function Miniature({ kind }: { kind: string }) {
  if (kind === "signsense")
    return (
      <div className="mini-hand" aria-hidden="true">
        <svg viewBox="0 0 200 160">
          <path
            d="m95 133-32-28-14-35 9-5 19 26-8-64 11-2 13 58-2-76 12-1 3 77 11-69 11 2-9 72 18-49 11 4-15 58-8 24-18 14Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          {[
            [95, 133],
            [63, 105],
            [49, 70],
            [77, 91],
            [69, 27],
            [93, 83],
            [91, 7],
            [106, 83],
            [117, 14],
            [119, 88],
            [137, 39],
            [122, 97],
            [114, 121],
            [95, 103],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.8 : 2.3} />
          ))}
          <path
            d="m95 133 0-30-32 2m32-2 11-20 13 5m-24 15-2-20-16 8m18 12 27-6"
            fill="none"
            stroke="currentColor"
            opacity=".45"
          />
        </svg>
        <span>Landmarks → temporal features</span>
      </div>
    );
  if (kind === "syncspace")
    return (
      <div className="mini-docs" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="mini-peer peer-one">V</span>
        <span className="mini-peer peer-two">S</span>
        <small>Local edits. Shared state.</small>
      </div>
    );
  return (
    <div className="mini-pipeline" aria-hidden="true">
      <div>
        <span>01</span>Retrieve
      </div>
      <i>→</i>
      <div>
        <span>02</span>Rank
      </div>
      <i>→</i>
      <div>
        <span>03</span>Diversify
      </div>
      <i>→</i>
      <div>
        <span>04</span>Serve
      </div>
      <small>12.5M interactions → recommendations</small>
    </div>
  );
}
