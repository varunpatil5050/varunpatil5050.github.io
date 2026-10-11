"use client";

import { useState } from "react";
import { AtelierPreview } from "./ProjectVisuals";
import "../atelier-story.css";

const chapterNames = ["Shared state", "Human approval", "Replayable history"];

/** A manually explored preview that never interrupts native page scrolling. */
export default function AtelierStory() {
  const [step, setStep] = useState(0);

  return (
    <div className="atelier-story">
      <div className="project-stage dark-stage" data-reveal="scene">
        <AtelierPreview step={step} onStepChange={setStep} />
      </div>
      <div className="atelier-story-caption" aria-hidden="true">
        <span className="atelier-story-chapter">
          0{step + 1} / {chapterNames[step]}
        </span>
        <span className="atelier-story-segments">
          {chapterNames.map((name, index) => (
            <i key={name} data-active={index === step} />
          ))}
        </span>
        <span className="atelier-story-control-hint">
          Explore with the controls ↑
        </span>
      </div>
    </div>
  );
}
