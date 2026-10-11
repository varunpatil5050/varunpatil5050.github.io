"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import styles from "./Orbital.module.css";

export default function Orbital() {
  const panel = useRef<HTMLDivElement>(null);
  const descriptionId = useId();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "60px" },
    );
    if (panel.current) observer.observe(panel.current);

    return () => {
      preference.removeEventListener("change", updatePreference);
      observer.disconnect();
    };
  }, []);

  function moveDepth(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--orbit-x", `${(x - 0.5) * 6}deg`);
    event.currentTarget.style.setProperty("--orbit-y", `${(0.5 - y) * 6}deg`);
  }

  function resetDepth() {
    panel.current?.style.setProperty("--orbit-x", "0deg");
    panel.current?.style.setProperty("--orbit-y", "0deg");
  }

  return (
    <div
      ref={panel}
      className={styles.panel}
      data-running={!paused && inView && !reducedMotion}
      onPointerMove={moveDepth}
      onPointerLeave={resetDepth}
      role="group"
      aria-label="An orbit of ideas"
      aria-describedby={descriptionId}
    >
      <p id={descriptionId} className={styles.srOnly}>
        Software, intelligence, and product orbit a shared engineering practice.
        The illustration responds to your pointer. Motion can be paused.
      </p>

      <div className={styles.instrument} aria-hidden="true">
        <div className={styles.masthead}>
          <span>VP / AN ORBIT OF IDEAS</span>
          <span className={styles.instrumentMark}>✳</span>
        </div>

        <div className={styles.atmosphere} />
        <div className={styles.field}>
          <div className={styles.axisHorizontal} />
          <div className={styles.axisVertical} />
          <div className={`${styles.orbit} ${styles.orbitOuter}`}>
            <i className={styles.nodeOuter} />
            <i className={styles.nodeLilac} />
            <span className={styles.orbitNotch} />
          </div>
          <div className={`${styles.orbit} ${styles.orbitMiddle}`}>
            <i className={styles.nodeMiddle} />
            <i className={styles.nodeLime} />
            <i className={styles.nodeOrange} />
          </div>
          <div className={`${styles.orbit} ${styles.orbitInner}`} />
          <div className={styles.coreHalo} />
          <div className={styles.core}>
            <span>VP</span>
            <small>ENGINEERING</small>
          </div>
        </div>

        <div className={`${styles.label} ${styles.labelSoftware}`}>
          <span>01</span> SOFTWARE
        </div>
        <div className={`${styles.label} ${styles.labelIntelligence}`}>
          <span>02</span> INTELLIGENCE
        </div>
        <div className={`${styles.label} ${styles.labelProduct}`}>
          <span>03</span> PRODUCT
        </div>
        <span className={styles.axisIndex}>S / I / P</span>
      </div>

      <div className={styles.caption}>
        <p>
          <i aria-hidden="true" /> Open to ambitious problems
        </p>
        <button
          type="button"
          className={styles.motionButton}
          aria-pressed={paused}
          aria-label={paused ? "Resume orbital motion" : "Pause orbital motion"}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true" className={styles.motionIcon}>
            {paused ? "▷" : "Ⅱ"}
          </span>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
