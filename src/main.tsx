import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Initialize PostHog Analytics
posthog.init('phc_rVxbNnYaF5irWX2vYVNFHsTgCcjzauFEU8tkUP4rYZhD', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always' // Required for advanced session replays
});

createRoot(document.getElementById("root")!).render(<App />);
