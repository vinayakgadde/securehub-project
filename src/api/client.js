// Small helper for talking to the SecureHub Spring Boot API.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export async function postJson(path, body, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: options.keepalive === true, // lets the request finish while the page closes
    });
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Empty body (e.g. 204 No Content) - nothing to parse
  }

  if (!res.ok) {
    const error = new Error(
      res.status === 429
        ? 'Too many requests. Please try again later.'
        : data?.message || 'Something went wrong. Please try again.'
    );
    error.status = res.status;
    error.fieldErrors = data?.errors || null;
    throw error;
  }

  return data;
}

export const submitContact = (payload) => postJson('/api/contact', payload);

// Wakes the backend if the free hosting put it to sleep, so it is ready by the time
// a visitor fills in the form. The response is not needed, so CORS does not matter here.
export function warmUpApi() {
  fetch(`${API_URL}/api/health`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
}
