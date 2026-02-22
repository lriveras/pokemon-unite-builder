import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// localStorage migration guard
const STORAGE_VERSION = '1';
const storedVersion = localStorage.getItem('unite_builder_version');
if (storedVersion !== STORAGE_VERSION) {
  // Clear old data on version mismatch to prevent stale state issues
  const keysToKeep: string[] = [];
  const keys = Object.keys(localStorage).filter(k =>
    k.startsWith('unite-') && !keysToKeep.includes(k)
  );
  // Only clear if migrating from a previous version
  if (storedVersion !== null) {
    keys.forEach(k => localStorage.removeItem(k));
    console.info('[UNITE Builder] Storage migrated from version', storedVersion, '→', STORAGE_VERSION);
  }
  localStorage.setItem('unite_builder_version', STORAGE_VERSION);
}

// Catch unhandled JS errors and show them in the page
window.onerror = (_msg, _src, _line, _col, err) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<pre style="color:#f87171;background:#1a1a2e;padding:24px;margin:0;font-size:13px;white-space:pre-wrap">RUNTIME ERROR:\n${err?.stack ?? _msg}</pre>`;
  }
  return true;
};
window.addEventListener('unhandledrejection', (e) => {
  const root = document.getElementById('root');
  if (root && root.children.length === 0) {
    root.innerHTML = `<pre style="color:#f87171;background:#1a1a2e;padding:24px;margin:0;font-size:13px;white-space:pre-wrap">UNHANDLED PROMISE:\n${e.reason?.stack ?? e.reason}</pre>`;
  }
});

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (e) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<pre style="color:#f87171;background:#1a1a2e;padding:24px;margin:0;font-size:13px;white-space:pre-wrap">RENDER ERROR:\n${(e as Error)?.stack ?? e}</pre>`;
  }
}
