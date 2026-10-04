import { useEffect, useState } from 'react';

import { CONSENT_EVENT, getConsent, setConsent } from '../utils/consent';
import './CookieBanner.css';

function CookieBanner() {
  const [consent, setLocalConsent] = useState(getConsent);

  useEffect(() => {
    const sync = () => setLocalConsent(getConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (consent !== null) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="cookie-head">
        <div className="cookie-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <div className="cookie-body">
          <div id="cookie-title" className="cookie-title">
            Your privacy matters
          </div>
          <p id="cookie-desc" className="cookie-text">
            We use anonymous analytics to improve this website. No ads, and we
            never sell your data.{' '}
            <a href="/privacy.html">Learn more</a>
          </p>
        </div>
      </div>

      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-btn cookie-btn-secondary"
          onClick={() => setConsent('denied')}
        >
          Decline
        </button>
        <button
          type="button"
          className="cookie-btn cookie-btn-primary"
          onClick={() => setConsent('granted')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
