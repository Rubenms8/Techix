"use client";

export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("techix:cookie-preferences"))}
      className={className}
    >
      Preferencias de cookies
    </button>
  );
}
