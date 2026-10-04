import { useEffect } from 'react';

import Home from './pages/Home';
import CookieBanner from './components/CookieBanner';
import { CONSENT_EVENT, getConsent } from './utils/consent';
import { startTracking } from './utils/tracker';

function App() {
  useEffect(() => {
    // Track only after the visitor accepted analytics (now, or later via the banner)
    const startIfAllowed = () => {
      if (getConsent() === 'granted') startTracking();
    };

    startIfAllowed();
    window.addEventListener(CONSENT_EVENT, startIfAllowed);
    return () => window.removeEventListener(CONSENT_EVENT, startIfAllowed);
  }, []);

  return (
    <>
      <Home />
      <CookieBanner />
    </>
  );
}

export default App;
