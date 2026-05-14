import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Initialize PostHog Analytics - Configured for EU Cloud
posthog.init('phc_xWahzaXaHubibFsMXPp9LnJvfF3Br8YedAEejXznQUAT', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'always' // Required for advanced session replays
});

createRoot(document.getElementById("root")!).render(<App />);
