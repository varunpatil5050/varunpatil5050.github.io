"use client";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={down ? "arrow-down" : ""}
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
export function pointerLight(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType === "touch" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const element = event.currentTarget,
    rect = element.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width,
    y = (event.clientY - rect.top) / rect.height;
  element.style.setProperty("--mx", `${x * 100}%`);
  element.style.setProperty("--my", `${y * 100}%`);
  element.style.setProperty("--rx", `${(0.5 - y) * 2.5}deg`);
  element.style.setProperty("--ry", `${(x - 0.5) * 2.5}deg`);
}
export function resetLight(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
}
export function usePortfolioMotion() {
  useEffect(() => {
    const root = document.documentElement,
      media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story]"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--scroll-progress",
        `${height > 0 ? (window.scrollY / height) * 100 : 0}%`,
      );
      root.style.setProperty(
        "--hero-progress",
        media.matches
          ? "0"
          : String(Math.min(1, window.scrollY / (window.innerHeight * 0.85))),
      );
      if (!media.matches)
        scenes.forEach((scene) => {
          const rect = scene.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = Math.max(
              0,
              Math.min(
                1,
                (window.innerHeight - rect.top) /
                  (window.innerHeight + rect.height * 0.3),
              ),
            );
            scene.style.setProperty("--scene-progress", progress.toFixed(4));
          }
        });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    document.body.classList.add("motion-ready");
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      document.body.classList.remove("motion-ready");
    };
  }, []);
}
export function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  const prefix = detail ? "/" : "";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-line" aria-hidden="true" />
      <header className="site-header">
        <a
          className="brand"
          href={detail ? "/" : "#top"}
          aria-label="Varun Patil — home"
        >
          <span className="brand-mark">V</span>
          <span>Varun Patil</span>
        </a>
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          <a href={`${prefix}#work`} onClick={() => setOpen(false)}>
            Work
          </a>
          <a href={`${prefix}#about`} onClick={() => setOpen(false)}>
            About
          </a>
          <a href={`${prefix}#journey`} onClick={() => setOpen(false)}>
            Journey
          </a>
          <a
            className="mobile-contact"
            href={`${prefix}#contact`}
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </nav>
        <a
          className="nav-resume"
          href="/Varun-Patil-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé <Arrow />
        </a>
        <button
          ref={toggle}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
export function Footer({ detail = false }: { detail?: boolean }) {
  return (
    <footer
      className="contact-section"
      id="contact"
      onPointerMove={pointerLight}
      onPointerLeave={resetLight}
    >
      <div className="section-shell">
        <div className="contact-top">
          <p className="eyebrow">
            {detail ? "Continue the conversation" : "04 / What’s next?"}
          </p>
          <span className="contact-location">Hyderabad, India ↗</span>
        </div>
        <h2>
          Something ambitious
          <br />
          <em>on your mind?</em>
        </h2>
        <a className="contact-email" href="mailto:varunp685@gmail.com">
          Let’s talk <Arrow />
          <span className="email-address">varunp685@gmail.com</span>
        </a>
        <div className="footer-bottom">
          <a className="footer-brand" href={detail ? "/" : "#top"}>
            Varun Patil<span>Software. Intelligence. Product.</span>
          </a>
          <div className="footer-links">
            <ExternalLink href="https://github.com/varunpatil5050">
              GitHub <Arrow />
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/varun-patil-54060b177/">
              LinkedIn <Arrow />
            </ExternalLink>
            <a href="/Varun-Patil-Resume.pdf" download>
              Résumé <Arrow />
            </a>
          </div>
          <span className="footer-note">
            Built with intention.
            <br />© {new Date().getFullYear()} Varun Patil
          </span>
        </div>
      </div>
    </footer>
  );
}
