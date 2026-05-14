import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Initialize PostHog Analytics - Configured for EU Cloud
posthog.init('phc_xwahzaXaHSf5Bv7ZzX9n9GvWf8vVp9X3vVvVvVvVvVv', { // Remplacer par le jeton complet si différent
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'always' // Required for advanced session replays
});

createRoot(document.getElementById("root")!).render(<App />);
