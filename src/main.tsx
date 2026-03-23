import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  // Pre-rendered HTML exists, hydrate it
  hydrateRoot(rootElement, <App />);
} else {
  // No pre-rendered content, do normal client-side rendering
  createRoot(rootElement!).render(<App />);
}