export type ProjectMetric = {
  value: string;
  label: string;
  note?: string;
};

export type ProjectSection = {
  title: string;
  body: string[];
  points?: string[];
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  technologies: string[];
  github?: string;
  metrics: ProjectMetric[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "transformer-lms",
    number: "02",
    title: "Transformer LMs",
    category: "Language models · From first principles",
    summary:
      "Two independent Hindi and Nepali decoder-only Transformers, built from corpus preparation and tokenization through pretraining, reasoning finetuning, and reproducible recovery.",
    role: "Independent project",
    technologies: ["Python", "PyTorch", "SentencePiece", "NumPy", "Apple MPS"],
    github:
      "https://github.com/varunpatil5050/hindi-nepali-transformers-from-scratch",
    metrics: [
      { value: "25.3M", label: "parameters per model" },
      { value: "12", label: "decoder layers per model" },
      { value: "500M", label: "pretraining tokens per language" },
    ],
    sections: [
      {
        title: "The objective",
        body: [
          "Build the language-model training pipeline end to end, rather than treating a pretrained model as a black box. Hindi and Nepali each receive a separate tokenizer, model, and training run.",
        ],
      },
      {
        title: "From corpus to decoder",
        body: [
          "The data pipeline processes 1.18B corpus tokens with Unicode NFC normalization, SHA-256 exact deduplication, and deterministic splits. Each language uses a separate 10K-vocabulary SentencePiece BPE tokenizer with byte fallback.",
          "The decoder combines causal multihead attention, pre-LayerNorm residual blocks, GELU activations, learned positional embeddings, and tied input/output embeddings.",
        ],
        points: [
          "Normalize and deduplicate the corpus → deterministic data splits.",
          "Train language-specific tokenizers → memory-mapped token streams.",
          "Pretrain independent decoders → answer-only reasoning finetuning → held-out evaluation.",
        ],
      },
      {
        title: "Engineering for recovery",
        body: [
          "AdamW training uses gradient accumulation, gradient clipping, warmup, and cosine decay. Checkpoints restore the optimizer, scheduler, random-number state, and data-stream position—not only model weights.",
          "The reasoning stage uses answer-only supervised finetuning on synthetic comparative and transitive tasks. Its evaluation therefore measures this task setting, not general language understanding.",
        ],
      },
      {
        title: "Measured, not assumed",
        body: [
          "On 1,800 held-out examples per language, candidate exact-match accuracy increased from 30.33% to 70.67% for Hindi and from 31.11% to 63.61% for Nepali after reasoning finetuning.",
          "These results compare the pretrained and finetuned checkpoints on the reported reasoning benchmark. They are not claims of broad multilingual capability or production-model parity.",
        ],
      },
    ],
  },
  {
    slug: "atelier",
    number: "01",
    title: "Atelier",
    category: "Real-time systems · Human–agent collaboration",
    summary:
      "A collaborative code editor where local changes survive disconnection, people and agents share a CRDT document, and the room’s history remains inspectable through replay.",
    role: "Independent project",
    technologies: [
      "Yjs / CRDTs",
      "WebSockets",
      "PostgreSQL",
      "Prometheus",
      "Monaco",
      "tree-sitter",
      "node-pty",
      "xterm.js",
    ],
    github: "https://github.com/varunpatil5050/Atelier",
    metrics: [
      {
        value: "20+",
        label: "concurrent users",
        note: "Reported project concurrency.",
      },
      {
        value: "<50 ms",
        label: "synchronization latency",
        note: "Reported project result.",
      },
      { value: "5", label: "specialized agent roles" },
    ],
    sections: [
      {
        title: "The objective",
        body: [
          "Make collaborative coding resilient to interrupted connections while keeping human and AI contributions visible. The editor combines shared documents, live presence, code execution, and time-travel replay.",
        ],
      },
      {
        title: "A shared state, not competing copies",
        body: [
          "Yjs CRDT documents synchronize through distributed WebSocket gateways. Local edits merge on reconnection, with shared cursors and presence accompanying the document state.",
          "A recorded CRDT event log can be folded into a read-only Monaco document to reconstruct edits and presence. Isolated pseudo-terminals stream stdin/stdout through WebSockets using node-pty and xterm.js for JavaScript, Python, C++, and Java.",
        ],
        points: [
          "Local editor changes → Yjs document → WebSocket gateways → connected collaborators.",
          "Recorded CRDT events → replay reconstruction → read-only document and presence.",
          "Code execution → isolated pseudo-terminal → streamed terminal output.",
        ],
      },
      {
        title: "Agents with an audit trail",
        body: [
          "Planner, Coder, Reviewer, Tester, and Debugger agents participate in the shared document. A live tree-sitter code graph grounds their prompts in the codebase.",
          "Human approval gates proposed changes. Event-sourced runs make agent reasoning visible both during execution and in replay. This design prioritizes inspectability and approval over opaque, unattended edits.",
        ],
      },
      {
        title: "Results & scope",
        body: [
          "The project reports support for 20+ concurrent users with synchronization latency below 50 ms. These figures describe the project’s reported concurrency and sync behavior, not a commercial user count.",
          "The engineering focus is the relationship between offline convergence, live collaboration, and an inspectable history of human and agent contributions.",
        ],
      },
    ],
  },
  {
    slug: "judgment-explained",
    number: "03",
    title: "Judgment Explained",
    category: "Quantized LLM inference · Grounded verification",
    summary:
      "A document-grounded system for Indian judgments that retrieves evidence, checks who said what, and repairs attribution errors with paragraph-level provenance.",
    role: "Independent project",
    technologies: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "BM25",
      "Pydantic",
      "RAG",
    ],
    metrics: [
      {
        value: "−6 pp",
        label: "attribution errors",
        note: "Versus a generic evidence-checking baseline.",
      },
      { value: "90%", label: "key-information coverage retained" },
      {
        value: "64",
        label: "controlled claims",
        note: "Across 16 judgments and 3 system variants.",
      },
    ],
    sections: [
      {
        title: "The attribution problem",
        body: [
          "A supported statement can still be misleading if a system confuses a party’s submission with the court’s finding. This project focuses on source-versus-claim speaker and status checks, not only the presence of matching evidence.",
          "The objective is to make judgment explanations traceable to their supporting paragraphs while preserving the important information in the source.",
        ],
      },
      {
        title: "Evidence before confidence",
        body: [
          "PDF/text ingestion and BM25 passage retrieval produce fixed evidence pools from judgments selected from the 7,130-pair IN-Abs corpus. Quantized LLM inference supports a structured verification workflow with paragraph-level citations and provenance.",
        ],
        points: [
          "Judgment PDF/text → passage retrieval → fixed evidence pool.",
          "Claim and evidence → speaker/status verification → attribution repair.",
          "Supporting paragraph references → traceable explanation.",
        ],
      },
      {
        title: "Boundaries are part of the design",
        body: [
          "Schema-validated tool calls, bounded retries, and evidence-access controls constrain the verification process. Automated tests cover provenance, malformed inputs, and tool boundaries.",
          "Immutable snapshots, SHA-256 integrity checks, isolated inference sessions, and execution traces support repeatable comparisons. Fixed evidence pools make the retrieval context controlled rather than allowing each variant to search a different body of evidence.",
        ],
      },
      {
        title: "A controlled comparison",
        body: [
          "Three system variants were evaluated across 16 judgments and 64 controlled claims, with paired analysis of accuracy, coverage, repair success, latency, and token usage.",
          "Attribution errors fell by 6 percentage points versus the generic evidence-checking baseline while retaining 90% key-information coverage. This is a bounded experimental evaluation, not a claim of legal reliability across all judgments or a substitute for legal review.",
        ],
      },
    ],
  },
  {
    slug: "streamrank",
    number: "04",
    title: "StreamRank",
    category: "Machine learning · Recommendation systems",
    summary:
      "A four-stage recommendation system that connects candidate retrieval, ranking, diversity, and serving, trained on 12.5 million interactions.",
    role: "Independent project",
    technologies: ["PyTorch", "Kafka", "Redis", "FAISS", "Kubernetes"],
    github: "https://github.com/varunpatil5050/StreamRank",
    metrics: [
      { value: "12.5M", label: "training interactions" },
      { value: "4", label: "recommendation stages" },
    ],
    sections: [
      {
        title: "The objective",
        body: [
          "Build recommendation as an end-to-end system rather than an isolated prediction model. The work spans finding candidates, ordering them, introducing diversity, and delivering the final recommendations.",
        ],
      },
      {
        title: "A staged recommendation funnel",
        body: [
          "The pipeline separates retrieval, ranking, diversity, and serving. Its stack combines PyTorch with FAISS, Kafka, Redis, and Kubernetes.",
        ],
        points: [
          "Retrieve a candidate set → rank relevant candidates.",
          "Apply diversity → serve the recommendation set.",
        ],
      },
      {
        title: "Why separate the stages?",
        body: [
          "Retrieval and ranking solve different-sized problems: first narrow the candidate space, then spend more computation on the shortlist. A separate diversity stage makes variety an explicit part of the pipeline instead of assuming that relevance scores provide it.",
          "This is the architectural rationale for the staged design, not a claim of a measured lift attributable to any individual stage.",
        ],
      },
      {
        title: "Evidence & scope",
        body: [
          "The supplied project materials report training on 12.5M interactions. That number describes the training data, not a count of active users.",
          "The repository connects the model work to the retrieval, ranking, diversity, and serving stages of the system.",
        ],
      },
    ],
  },
  {
    slug: "signsense",
    number: "05",
    title: "SignSense",
    category: "Computer vision · Temporal deep learning",
    summary:
      "Real-time ASL recognition from normalized landmark sequences, connecting temporal model training with a low-latency streaming inference engine.",
    role: "Independent project",
    technologies: [
      "PyTorch",
      "MediaPipe",
      "OpenCV",
      "FastAPI",
      "ONNX Runtime",
      "MLflow",
    ],
    github: "https://github.com/varunpatil5050/SignSense",
    metrics: [
      { value: "0.92", label: "held-out ROC-AUC" },
      {
        value: "68%",
        label: "test accuracy",
        note: "10-sign LSTM experiment; 74% validation accuracy.",
      },
      { value: "<15 ms", label: "streaming inference per frame" },
    ],
    sections: [
      {
        title: "The objective",
        body: [
          "Translate sequences of visual landmarks into ASL sign predictions, with training-time preprocessing carried consistently into live inference.",
        ],
      },
      {
        title: "From movement to temporal features",
        body: [
          "The pipeline uses MediaPipe Holistic landmarks from Google’s 250-sign Isolated SLR dataset on Kaggle, converting them into normalized 126-dimensional temporal feature sequences. Temporal modeling work includes LSTM, TCN, and Transformer sequence models.",
          "The streaming engine combines FastAPI WebSockets, a temporal buffer, and confidence gating. Training and inference share the same normalization.",
        ],
        points: [
          "Video frames → MediaPipe landmarks → normalized 126-D sequences.",
          "Temporal buffer → sequence model → confidence-gated prediction.",
        ],
      },
      {
        title: "Consistency at the boundary",
        body: [
          "Shared normalization keeps the feature representation aligned between offline training and the live stream. Buffering provides temporal context; confidence gating controls when a prediction is emitted.",
          "These are design choices for the streaming pipeline. They do not imply that every sign or unconstrained signing condition has been evaluated.",
        ],
      },
      {
        title: "The experiment, precisely",
        body: [
          "The reported LSTM experiment uses 704 Kaggle landmark clips spanning 10 ASL signs, achieving 74% validation accuracy, 68% test accuracy, and 0.92 ROC-AUC on held-out data. Streaming inference is reported below 15 ms per frame.",
          "The 10-sign experiment is a subset of the 250-sign source dataset. Its results should not be read as accuracy over all 250 signs or as full sign-language translation.",
        ],
      },
    ],
  },
].sort((a, b) => Number(a.number) - Number(b.number));

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
