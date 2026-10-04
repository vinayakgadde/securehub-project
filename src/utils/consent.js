// Stores the visitor's analytics choice: 'granted' | 'denied' | null (not asked yet).
const KEY = 'securehub_consent';
export const CONSENT_EVENT = 'securehub:consent-changed';

// Everything the tracker stores in the browser (removed when consent is not granted)
const TRACKING_LOCAL_KEYS = ['securehub_visitor_id'];
const TRACKING_SESSION_KEYS = [
  'securehub_session_id',
  'securehub_visit_sent',
  'securehub_active_ms',
];

let memoryValue = null; // fallback when the browser blocks storage

export function getConsent() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // storage blocked - use the in-memory value below
  }
  return memoryValue;
}

function clearTrackingData() {
  try {
    TRACKING_LOCAL_KEYS.forEach((k) => localStorage.removeItem(k));
    TRACKING_SESSION_KEYS.forEach((k) => sessionStorage.removeItem(k));
  } catch {
    // nothing to clear
  }
}

function notify() {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function setConsent(value) {
  memoryValue = value;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // storage blocked - choice only lasts for this page load
  }
  if (value !== 'granted') clearTrackingData();
  notify();
}

// Used by the "Cookie settings" link in the footer: forget the choice and ask again
export function resetConsent() {
  memoryValue = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  clearTrackingData();
  notify();
}
