import { Header, Footer } from "./components/Site";
export default function NotFound() {
  return (
    <>
      <Header detail />
      <main className="section-shell not-found" id="main-content">
        <p className="eyebrow">404 / A small detour</p>
        <h1>Not in this orbit.</h1>
        <p>This page doesn’t exist. There’s plenty to explore back home.</p>
        <a href="/" className="pill-link">
          Return to portfolio ↗
        </a>
      </main>
      <Footer detail />
    </>
  );
}
