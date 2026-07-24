// Theme handling. Dark-first per spec §7.1.
// The initial class must be set BEFORE the CSS loads, otherwise you get FOWT
// (flash of wrong theme). The `themeScript` string below is inlined into
// <head> in layout.tsx to run synchronously before hydration.

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// This runs client-side on every page load before React hydrates. It reads
// localStorage first, falls back to OS preference. Missing preference → dark.
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      var systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      theme = systemPrefersLight ? 'light' : 'dark';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    // Fail silently — dark class is on by default in the SSR output.
  }
})();
`;

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function setStoredTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
