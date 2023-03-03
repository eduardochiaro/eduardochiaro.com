declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: URL) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = (action: Gtag.EventNames, { event_category, event_label, value }: Gtag.EventParams) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};
