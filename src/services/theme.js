// frontend/src/services/theme.js

export const THEMES = [
  {
    id: 'lime',
    name: 'Electric Lime',
    hex: '#c8ff3d',
    rgb: '200, 255, 61',
    glow: 'rgba(200, 255, 61, 0.35)',
    contrast: '#000000',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    hex: '#00f0ff',
    rgb: '0, 240, 255',
    glow: 'rgba(0, 240, 255, 0.35)',
    contrast: '#000000',
  },
  {
    id: 'violet',
    name: 'Neon Violet',
    hex: '#a855f7',
    rgb: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.35)',
    contrast: '#ffffff',
  },
  {
    id: 'pink',
    name: 'Hot Pink',
    hex: '#ff3388',
    rgb: '255, 51, 136',
    glow: 'rgba(255, 51, 136, 0.35)',
    contrast: '#ffffff',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    hex: '#fbbf24',
    rgb: '251, 191, 36',
    glow: 'rgba(251, 191, 36, 0.35)',
    contrast: '#000000',
  },
];

const listeners = new Set();

export function getSavedTheme() {
  if (typeof window === 'undefined') return THEMES[0];
  const savedId = localStorage.getItem('gm_theme_accent');
  return THEMES.find((t) => t.id === savedId) || THEMES[0];
}

export function applyTheme(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.hex);
    root.style.setProperty('--theme-accent-rgb', theme.rgb);
    root.style.setProperty('--theme-accent-glow', theme.glow);
    root.style.setProperty('--theme-accent-contrast', theme.contrast);
    try {
      localStorage.setItem('gm_theme_accent', theme.id);
    } catch (e) {
      // Ignore
    }
  }
  listeners.forEach((fn) => fn(theme));
  return theme;
}

export function subscribeTheme(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Auto-initialize theme immediately upon script load
if (typeof window !== 'undefined') {
  applyTheme(getSavedTheme().id);
}
