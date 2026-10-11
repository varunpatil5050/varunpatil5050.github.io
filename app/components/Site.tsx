"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

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
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    document.body.classList.add("motion-ready");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const magnetic = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".pill-link, .nav-resume, .copy-email",
      ),
    );
    const resetMagnet = (element: HTMLElement) => {
      element.style.setProperty("--magnet-x", "0px");
      element.style.setProperty("--magnet-y", "0px");
    };
    const bindings = magnetic.map((element) => {
      const move = (event: globalThis.PointerEvent) => {
        if (
          media.matches ||
          !finePointer.matches ||
          event.pointerType === "touch"
        )
          return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.06;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
        element.style.setProperty(
          "--magnet-x",
          `${Math.max(-4, Math.min(4, x))}px`,
        );
        element.style.setProperty(
          "--magnet-y",
          `${Math.max(-3, Math.min(3, y))}px`,
        );
      };
      const leave = () => resetMagnet(element);
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      element.addEventListener("blur", leave);
      return { element, move, leave };
    });
    const resetMagnets = () => magnetic.forEach(resetMagnet);
    media.addEventListener("change", resetMagnets);
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
      media.removeEventListener("change", resetMagnets);
      bindings.forEach(({ element, move, leave }) => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        element.removeEventListener("blur", leave);
        resetMagnet(element);
      });
      document.body.classList.remove("motion-ready");
    };
  }, []);
}
export function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (detail) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -70% 0px" },
    );
    ["top", "work", "about", "journey", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [detail]);
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
          <span className="brand-mark">VP</span>
          <span>Varun Patil</span>
        </a>
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          <a
            href={`${prefix}#work`}
            aria-current={active === "work" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            Work
          </a>
          <a
            href={`${prefix}#about`}
            aria-current={active === "about" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href={`${prefix}#journey`}
            aria-current={active === "journey" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
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
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    },
    [],
  );
  async function copyEmail() {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    try {
      await navigator.clipboard.writeText("varunp685@gmail.com");
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    copyTimeout.current = setTimeout(() => setCopyState("idle"), 3500);
  }
  return (
    <footer className="contact-section" id="contact">
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
        <div className="contact-actions">
          <a className="contact-email" href="mailto:varunp685@gmail.com">
            <span className="contact-email-label">
              Let’s start a conversation
            </span>
            <span className="contact-email-address">
              varunp685@gmail.com <Arrow />
            </span>
          </a>
          <button className="copy-email" onClick={copyEmail}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="8"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {copyState === "copied" ? "Copied" : "Copy email"}
          </button>
          <p className="copy-feedback" role="status">
            {copyState === "copied"
              ? "Email copied to clipboard."
              : copyState === "failed"
                ? "Couldn’t copy. You can use the email link."
                : ""}
          </p>
        </div>
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
