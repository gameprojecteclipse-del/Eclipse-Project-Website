import { createRoot } from "react-dom/client";
import mixpanel from "mixpanel-browser";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Initialize Mixpanel Analytics - Configured for EU Data Residency
mixpanel.init('e9b8ed39cd6166cba531878526cd5c60', {
    api_host: "https://api-eu.mixpanel.com",
    track_pageview: true,
    record_sessions: true, // Activation de l'enregistrement des sessions
    persistence: 'localStorage'
});

createRoot(document.getElementById("root")!).render(<App />);
