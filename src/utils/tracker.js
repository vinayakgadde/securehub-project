// Visitor tracker for the SecureHub site (runs only after the visitor accepted analytics).
//
// What it records (via the Spring Boot API):
//   1. One "visit" per browser-tab session: referrer, UTM tags, screen size, language
//      (the server adds device / browser / OS from the user agent and a hashed IP)
//   2. Which sections of the page the visitor actually scrolled to
//   3. Active time on the site (only counted while the tab is visible)
//
// It never throws: if the backend is down, the website keeps working normally.
import { postJson } from '../api/client';
import { getConsent } from './consent';
import { getVisitorId, uuid } from './visitor';

const SESSION_KEY = 'securehub_session_id';
const SENT_KEY = 'securehub_visit_sent';
const ACTIVE_KEY = 'securehub_active_ms';

// Must match the id="..." values in your components
const SECTION_IDS = ['home', 'services', 'about', 'process', 'solutions', 'faq', 'contact'];

const HEARTBEAT_MS = 20000; // send time-on-site every 20 s while the tab is visible

let started = false;

const allowed = () => getConsent() === 'granted';

function readSession(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null; // storage blocked
  }
}

function writeSession(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // storage blocked - tracking still works for this page load
  }
}

function clip(value, max) {
  return value ? String(value).slice(0, max) : null;
}

export function startTracking() {
  if (started || typeof window === 'undefined' || !allowed()) return;
  started = true; // also protects against React StrictMode running effects twice in dev

  // ---- identity ----
  let sessionId = readSession(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuid();
    writeSession(SESSION_KEY, sessionId);
  }
  const visitorId = getVisitorId() || sessionId; // fallback if localStorage is blocked

  // ---- active time (only while the tab is visible) ----
  let activeMs = Number(readSession(ACTIVE_KEY)) || 0;
  let visibleSince = document.visibilityState === 'visible' ? Date.now() : null;
  let visitReady = false;

  const currentSeconds = () => {
    const live = visibleSince ? Date.now() - visibleSince : 0;
    return Math.min(86400, Math.round((activeMs + live) / 1000));
  };

  const pause = () => {
    if (visibleSince) {
      activeMs += Date.now() - visibleSince;
      visibleSince = null;
      if (allowed()) writeSession(ACTIVE_KEY, String(activeMs));
    }
  };

  const resume = () => {
    if (!visibleSince) visibleSince = Date.now();
  };

  const sendEnd = (keepalive) => {
    if (!visitReady || !allowed()) return;
    const durationSeconds = currentSeconds();
    if (durationSeconds < 1) return;
    postJson('/api/track/end', { sessionId, durationSeconds }, { keepalive }).catch(() => {});
  };

  // ---- visit payload ----
  const buildVisit = () => {
    const params = new URLSearchParams(window.location.search);
    const { origin, pathname, search } = window.location;
    return {
      visitorId,
      sessionId,
      landingUrl: clip(origin + pathname + search, 500),
      referrer: clip(document.referrer, 500),
      utmSource: clip(params.get('utm_source'), 100),
      utmMedium: clip(params.get('utm_medium'), 100),
      utmCampaign: clip(params.get('utm_campaign'), 100),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: clip(navigator.language, 20),
    };
  };

  // ---- section views ----
  const observeSections = () => {
    if (!('IntersectionObserver' in window)) return;

    const seen = new Set();
    // A section counts as "seen" once its top enters the upper ~65% of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !allowed()) return;
          const id = entry.target.id;
          if (seen.has(id)) return;
          seen.add(id);
          observer.unobserve(entry.target);
          postJson('/api/track/section', { sessionId, sectionId: id }).catch(() => {});
        });
      },
      { rootMargin: '0px 0px -35% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  };

  // ---- page leave / tab hidden ----
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      pause();
      sendEnd(true);
    } else {
      resume();
    }
  });
  window.addEventListener('pagehide', () => {
    pause();
    sendEnd(true);
  });
  window.setInterval(() => {
    if (document.visibilityState === 'visible') sendEnd(false);
  }, HEARTBEAT_MS);

  // ---- go ----
  const begin = async () => {
    // New tab session -> register the visit. A page reload in the same tab reuses it.
    if (!readSession(SENT_KEY)) {
      try {
        await postJson('/api/track/visit', buildVisit());
        writeSession(SENT_KEY, '1');
      } catch {
        return; // backend unreachable: stay silent
      }
    }
    visitReady = true;
    observeSections(); // only after the visit exists, so the server can attach sections to it
  };

  begin();
}
