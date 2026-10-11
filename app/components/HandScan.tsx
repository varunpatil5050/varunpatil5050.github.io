"use client";

import { useEffect, useId, useRef, useState } from "react";
import "../hand-scan.css";

const points = [
  { x: 280, y: 486 }, // 0: wrist
  { x: 211, y: 382 },
  { x: 156, y: 338 },
  { x: 117, y: 290 },
  { x: 80, y: 246 }, // 1–4: thumb
  { x: 216, y: 303 },
  { x: 194, y: 211 },
  { x: 182, y: 153 },
  { x: 174, y: 107 }, // 5–8: index
  { x: 268, y: 293 },
  { x: 262, y: 185 },
  { x: 259, y: 119 },
  { x: 256, y: 69 }, // 9–12: middle
  { x: 319, y: 305 },
  { x: 324, y: 212 },
  { x: 330, y: 154 },
  { x: 333, y: 108 }, // 13–16: ring
  { x: 365, y: 336 },
  { x: 391, y: 268 },
  { x: 408, y: 224 },
  { x: 422, y: 188 }, // 17–20: pinky
];

// MediaPipe's hand topology, not measured coordinates or model predictions.
// https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/drawing_styles/hand_landmarker/HandLandmark
const connections = [
  [0, 1],
  [0, 5],
  [5, 9],
  [9, 13],
  [13, 17],
  [0, 17],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [6, 7],
  [7, 8],
  [9, 10],
  [10, 11],
  [11, 12],
  [13, 14],
  [14, 15],
  [15, 16],
  [17, 18],
  [18, 19],
  [19, 20],
];

const fingers = [
  { name: "Thumb", start: 1, end: 4, joints: "CMC → MCP → IP → tip" },
  { name: "Index", start: 5, end: 8, joints: "MCP → PIP → DIP → tip" },
  { name: "Middle", start: 9, end: 12, joints: "MCP → PIP → DIP → tip" },
  { name: "Ring", start: 13, end: 16, joints: "MCP → PIP → DIP → tip" },
  { name: "Pinky", start: 17, end: 20, joints: "MCP → PIP → DIP → tip" },
];

const silhouette = `M230 522
  C230 482 216 465 203 444 C188 422 170 403 151 382
  C115 341 85 301 65 270 C54 253 61 234 76 231
  C95 226 111 246 126 265 C159 300 184 328 193 326
  C186 275 170 210 155 154 C151 139 150 127 151 117
  C151 94 157 83 171 83 C186 82 195 94 198 113
  C204 161 216 231 224 256 C232 264 239 253 239 240
  C236 180 234 115 234 77 C234 53 242 42 256 42
  C271 42 280 53 281 76 C282 141 285 210 288 249
  C296 263 303 258 304 244 C306 195 309 150 311 119
  C312 95 319 83 333 83 C348 83 356 95 355 117
  C353 179 349 235 348 272 C350 292 359 297 367 281
  C381 248 395 212 402 191 C410 170 421 162 433 167
  C447 173 450 185 443 204 C425 248 407 296 395 333
  C389 356 390 386 378 415 C364 448 345 472 338 494
  L337 522 Z`;

export default function HandScan() {
  const panel = useRef<HTMLElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [selected, setSelected] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const finger = fingers[selected];
  const isSelected = (index: number) =>
    index >= finger.start && index <= finger.end;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "40px" },
    );
    if (panel.current) observer.observe(panel.current);
    return () => {
      preference.removeEventListener("change", updatePreference);
      observer.disconnect();
    };
  }, []);

  return (
    <figure
      ref={panel}
      className="hand-scan"
      data-running={!paused && inView && !reducedMotion}
    >
      <div className="hand-scan-topline">
        <span>SignSense / Hand landmarks</span>
        <span>21 points</span>
      </div>

      <div className="hand-scan-view">
        <svg
          className="hand-scan-svg"
          viewBox="0 0 520 555"
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <title id={titleId}>An open hand with 21 connected landmarks</title>
          <desc id={descriptionId}>
            Anatomical illustration using MediaPipe landmark numbering: wrist 0,
            thumb 1 through 4, index 5 through 8, middle 9 through 12, ring 13
            through 16, and pinky 17 through 20. The highlighted finger can be
            changed using the buttons below.
          </desc>
          <g aria-hidden="true">
            <path className="hand-scan-outline" d={silhouette} />
            <path
              className="hand-scan-crease"
              d="M205 352 C234 365 255 405 248 446 M232 331 C271 342 309 347 352 337 M248 458 C278 448 307 449 333 463"
            />
            <g className="hand-scan-connections">
              {connections.map(([from, to]) => (
                <line
                  key={`${from}-${to}`}
                  data-connection={`${from}-${to}`}
                  data-selected={isSelected(from) && isSelected(to)}
                  x1={points[from].x}
                  y1={points[from].y}
                  x2={points[to].x}
                  y2={points[to].y}
                />
              ))}
            </g>
            <g className="hand-scan-landmarks">
              {points.map((point, index) => (
                <g
                  key={index}
                  data-landmark={index}
                  data-selected={isSelected(index)}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected(index) ? 5 : 3.5}
                  />
                  <text x={point.x + 10} y={point.y - 9}>
                    {String(index).padStart(2, "0")}
                  </text>
                </g>
              ))}
            </g>
            <g className="hand-scan-beam">
              <rect x="36" y="-5" width="448" height="10" />
              <line x1="36" y1="0" x2="484" y2="0" />
              <path d="M36 -4V4 M484 -4V4" />
            </g>
          </g>
          <text
            className="hand-scan-wrist-label"
            x="280"
            y="546"
            textAnchor="middle"
            aria-hidden="true"
          >
            00 / WRIST
          </text>
        </svg>
        <span className="hand-scan-view-note" aria-hidden="true">
          2D ANATOMY STUDY
        </span>
        <button
          type="button"
          className="hand-scan-pause"
          aria-pressed={paused}
          aria-label={
            reducedMotion
              ? "Scan animation disabled by reduced motion preference"
              : paused
                ? "Resume hand scan animation"
                : "Pause hand scan animation"
          }
          disabled={reducedMotion}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">
            {reducedMotion ? "—" : paused ? "▷" : "Ⅱ"}
          </span>
          {reducedMotion
            ? "Static view"
            : paused
              ? "Resume scan"
              : "Pause scan"}
        </button>
      </div>

      <div className="hand-scan-anatomy">
        <div
          className="hand-scan-fingers"
          role="group"
          aria-label="Highlight a finger’s landmarks"
        >
          {fingers.map((item, index) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="hand-scan-readout"
          aria-live="polite"
          aria-atomic="true"
        >
          <strong>
            {finger.name}{" "}
            <span>
              Landmarks {finger.start}–{finger.end}
            </span>
          </strong>
          <p>{finger.joints}</p>
        </div>
      </div>

      <figcaption className="hand-scan-caption">
        <p>Illustrative anatomy—not camera input or model output.</p>
        <a
          href="https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/drawing_styles/hand_landmarker/HandLandmark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Landmark reference ↗
        </a>
      </figcaption>
    </figure>
  );
}
