"use client";

import { useEffect, useRef, useState } from "react";
import { AtelierPreview } from "./ProjectVisuals";
import { pointerLight, resetLight } from "./Site";
import "../atelier-story.css";

const chapterNames = ["Shared state", "Human approval", "Replayable history"];
const stickyTop = 108;

/** A short native-scroll chapter; smaller screens retain the manual preview. */
export default function AtelierStory() {
  const story = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const scrollStep = useRef(0);
  const manualChapter = useRef<number | null>(null);
  const [step, setStep] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const element = story.current;
    const pinned = pin.current;
    if (!element || !pinned) return;

    const preference = window.matchMedia(
      "(min-width: 1101px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let enabled = false;
    let listening = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!enabled || !visible) return;
      const distance = element.offsetHeight - pinned.offsetHeight;
      if (distance <= 0) return;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (stickyTop - element.getBoundingClientRect().top) / distance,
        ),
      );
      const next = Math.min(2, Math.floor(progress * 3));
      scrollStep.current = next;

      // A manual choice stays put until scrolling reaches another chapter.
      if (manualChapter.current === next) return;
      manualChapter.current = null;
      setStep((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const syncListener = () => {
      const shouldListen = enabled && visible;
      if (shouldListen && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        listening = true;
      } else if (!shouldListen && listening) {
        window.removeEventListener("scroll", schedule);
        listening = false;
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      if (shouldListen) schedule();
    };

    const checkLayout = () => {
      // Do not pin a composition that cannot comfortably fit below navigation.
      enabled =
        preference.matches && pinned.offsetHeight <= window.innerHeight - 138;
      setScrollEnabled(enabled);
      if (!enabled) manualChapter.current = null;
      syncListener();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncListener();
      },
      { rootMargin: "80px 0px" },
    );
    observer.observe(element);
    preference.addEventListener("change", checkLayout);
    window.addEventListener("resize", checkLayout);
    checkLayout();

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", checkLayout);
      window.removeEventListener("resize", checkLayout);
      window.removeEventListener("scroll", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function chooseStep(next: number) {
    manualChapter.current = scrollStep.current;
    setStep(next);
  }

  return (
    <div ref={story} className="atelier-story" data-scroll={scrollEnabled}>
      <div ref={pin} className="atelier-story-pin">
        <div
          className="project-stage dark-stage"
          data-reveal="scene"
          onPointerMove={pointerLight}
          onPointerLeave={resetLight}
        >
          <AtelierPreview step={step} onStepChange={chooseStep} />
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
          <span className="atelier-story-scroll-hint">Scroll to unfold ↓</span>
          <span className="atelier-story-control-hint">
            Explore with the controls ↑
          </span>
        </div>
      </div>
    </div>
  );
}
