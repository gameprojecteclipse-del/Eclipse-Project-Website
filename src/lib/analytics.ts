/**
 * Google Analytics 4 (GA4) Analytics Helper
 * Provides a unified, type-safe interface for logging custom events, page views, and interactions.
 */

// Safely retrieve the global window.gtag function
const getGtag = (): any => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    return (window as any).gtag;
  }
  return null;
};

/**
 * Tracks a custom event in Google Analytics 4
 * @param eventName Name of the event (use snake_case by GA4 convention)
 * @param params Additional event parameters/metadata
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  const gtag = getGtag();
  if (gtag) {
    gtag("event", eventName, {
      ...params,
      sent_to: "G-ZJ90EHP5M9", // Explicitly direct to our measurement ID
    });
    console.log(`[GA4 Event] ${eventName}`, params);
  }
};

/**
 * Manually logs a page view event (vital for Single Page Applications like React Router)
 * @param path The route path (e.g., '/eclipse', '/chroma')
 * @param title The page title
 */
export const trackPageView = (path: string, title?: string) => {
  const gtag = getGtag();
  if (gtag) {
    gtag("config", "G-ZJ90EHP5M9", {
      page_path: path,
      page_title: title || document.title,
    });
    console.log(`[GA4 PageView] ${path} - ${title || document.title}`);
  }
};

/**
 * Tracks click events on key interactive items (buttons, links, images, CTA)
 * @param elementId The descriptive ID of the clicked element (e.g., 'discord_cta_button')
 * @param category Category of engagement (e.g., 'engagement', 'navigation', 'media')
 * @param label Human-readable label (e.g., 'Discord Join', 'Eclipse Lore Expansion')
 */
export const trackClick = (elementId: string, category: string, label: string) => {
  trackEvent("click_interaction", {
    element_id: elementId,
    event_category: category,
    event_label: label,
  });
};

/**
 * Helper to track successful Discord CTA interactions (Crucial Conversion Point)
 */
export const trackDiscordJoin = () => {
  trackEvent("join_discord", {
    event_category: "conversion",
    event_label: "Discord Community CTA",
  });
};

/**
 * Helper to track contact form submissions
 * @param formId ID/name of the form
 * @param status 'success' or 'fail'
 */
export const trackFormSubmit = (formId: string, status: "success" | "fail" = "success") => {
  trackEvent("form_submission", {
    form_id: formId,
    status: status,
    event_category: "conversion",
  });
};

/**
 * Tracks language switches
 * @param fromLang Previous language
 * @param toLang Selected new language
 */
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  trackEvent("language_switch", {
    previous_language: fromLang,
    selected_language: toLang,
  });
};
