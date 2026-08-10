'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics 4 — pageview + e-commerce event tracking.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to enable.
 * If the env var is missing, the component renders nothing.
 *
 * E-commerce events are dispatched via window.gtag('event', 'event_name', payload)
 * from other client components (cart, checkout, product pages).
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });

          // Helper for e-commerce events used across the app
          window.trackEvent = function(eventName, params) {
            gtag('event', eventName, params || {});
          };
        `}
      </Script>
    </>
  );
}

/** Track a GA4 e-commerce event from any client component. */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const w = window as Window & { trackEvent?: (name: string, params?: Record<string, unknown>) => void };
    w.trackEvent?.(eventName, params);
  }
}

